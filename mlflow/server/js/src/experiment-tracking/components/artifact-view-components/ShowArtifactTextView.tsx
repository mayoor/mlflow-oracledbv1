import React, { Component } from 'react';
import { getSrc } from './ShowArtifactPage';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy as style } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { getLanguage } from '../../../common/utils/FileUtils';
import { getArtifactContent } from '../../../common/utils/ArtifactUtils';
import './ShowArtifactTextView.css';

type OwnProps = {
  runUuid: string;
  path: string;
  getArtifact?: (...args: any[]) => any;
};

type State = any;

type Props = OwnProps & typeof ShowArtifactTextView.defaultProps;

class ShowArtifactTextView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.fetchArtifacts = this.fetchArtifacts.bind(this);
  }

  static defaultProps = {
    getArtifact: getArtifactContent,
  };

  state = {
    loading: true,
    error: undefined,
    text: undefined,
  };

  componentDidMount() {
    this.fetchArtifacts();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.path !== prevProps.path || this.props.runUuid !== prevProps.runUuid) {
      this.fetchArtifacts();
    }
  }

  render() {
    if (this.state.loading) {
      return <div className='artifact-text-view-loading'>Loading...</div>;
    }
    if (this.state.error) {
      return (
        <div className='artifact-text-view-error'>
          Oops we couldn't load your file because of an error.
        </div>
      );
    } else {
      const language = getLanguage(this.props.path);
      const overrideStyles = {
        fontFamily: 'Source Code Pro,Menlo,monospace',
        fontSize: '13px',
        overflow: 'auto',
        marginTop: '0',
        width: '100%',
        height: '100%',
        padding: '5px',
      };
      const renderedContent = ShowArtifactTextView.prettifyText(language, this.state.text);
      return (
        <div className='ShowArtifactPage'>
          <div className='text-area-border-box'>
            <SyntaxHighlighter language={language} style={style} customStyle={overrideStyles}>
              {renderedContent}
            </SyntaxHighlighter>
          </div>
        </div>
      );
    }
  }

  static prettifyText(language: any, rawText: any) {
    if (language === 'json') {
      try {
        const parsedJson = JSON.parse(rawText);
        return JSON.stringify(parsedJson, null, 2);
      } catch (e) {
        return rawText;
      }
    }
    return rawText;
  }

  /** Fetches artifacts and updates component state with the result */
  fetchArtifacts() {
    const artifactLocation = getSrc(this.props.path, this.props.runUuid);
    this.props
      .getArtifact(artifactLocation)
      .then((text: any) => {
        this.setState({ text: text, loading: false });
      })
      .catch((error: any) => {
        this.setState({ error: error, loading: false });
      });
  }
}

export default ShowArtifactTextView;
