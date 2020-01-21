import { IconButton, PivotItem } from 'office-ui-fabric-react';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { SeverityLevel } from '@microsoft/applicationinsights-web';
import { telemetry } from '../../../../telemetry';
import { getSnippet } from '../../../services/actions/snippet-action-creator';
import { Monaco } from '../../common';
import { genericCopy } from '../../common/copy';

interface ISnippetProps {
  language: string;
}

export function renderSnippets(supportedLanguages: string[]) {
  return supportedLanguages.map((language: string) => (
    <PivotItem
      key={language}
      headerText={language}
    >
      <Snippet language={language} />
    </PivotItem>
  ));
}

function Snippet(props: ISnippetProps) {
  let { language } = props;
  /**
   * Converting language lowercase so that we won't have to call toLowerCase() in multiple places.
   *
   * Ie the monaco component expects a lowercase string for the language prop and the graphexplorerapi expects
   * a lowercase string for the param value.
   */
  language = language.toLowerCase();


  const sampleQuery = useSelector((state: any) => state.sampleQuery, shallowEqual);
  const snippet = useSelector((state: any) => (state.snippets)[language]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingState, setLoadingState] = useState(false);

  const dispatch = useDispatch();

  const copyIcon = {
    iconName: 'copy',
  };

  useEffect(() => {
    setLoadingState(true);

    getSnippet(language, sampleQuery, dispatch)
      .then(() => setLoadingState(false))
      .catch((error) => {
        setLoadingState(false);
        setErrorMessage(error.message);
        telemetry.trackException(error, SeverityLevel.Critical);
      });

  }, [sampleQuery.sampleUrl]);

  const monacoContent = errorMessage ? errorMessage : snippet;

  return (
    <div style={{ display: 'block' }}>
      <IconButton style={{ float: 'right', zIndex: 1 }}
        iconProps={copyIcon} onClick={async () => genericCopy(snippet)} />
      <Monaco
        body={loadingState ? 'Fetching code snippet...' : monacoContent}
        language={language}
        readOnly={true}
      />
    </div>
  );
}
