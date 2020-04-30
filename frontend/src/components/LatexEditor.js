import React from 'react';
import RichTextEditor from "react-rte";
import { styles } from "../utils/styles";
import Modal from "./Modal";
import Latex from 'react-latex';
import { isJustWhitespace } from "../utils/strings";
import { withUserContext } from "./UserState";
import PdfPreview from "./PdfPreview";
import LoadingAnimation from "./LoadingAnimation";
import { post } from "../utils/api";
import { uriToBackend } from "./DownloadExam";

class LatexEditor extends React.Component {
  state = {
    isModalVisible: false,
    url: null,
    err: null,
  };

  onClickPreview = async () => {
    const { value } = this.props;
    this.setState({ isModalVisible: true, url: 'loading' });
    await post('preview-latex/', {
      value
    }).then(({ url }) => this.setState({ url: uriToBackend(url) }))
      .catch(err => this.setState({ url: 'error', err }));
  };

  onHideModal = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const { isModalVisible, url, err } = this.state;
    const { color, onChange, value, locale } = this.props;
    const disabled = isJustWhitespace(value);

    return <div style={{ position: 'relative' , width: "100%"}}>
      <textarea
        style={{
          ...styles.latexEditor,
          ...styles.fieldInput({ color }),
          fontFamily: 'monospace',
          backgroundColor: 'transparent',
        }}
        onChange={onChange}
        value={value}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: -28,
        }}
      >
        <button
          style={styles.button({ disabled })}
          onClick={this.onClickPreview} disabled={disabled}
        >
          {locale.preview}
        </button>
      </div>

      <Modal
        isVisible={isModalVisible} onHide={this.onHideModal}
        title={locale.preview}
      >
        {url === 'loading' ?
          <LoadingAnimation/>
          : url == null || url === 'error' ?
            <div>
              <pre>{err && err[0] ? err[0]
            : JSON.stringify(err, null, '\t')}</pre>
            </div>
          : <PdfPreview url={url}/>}
      </Modal>
    </div>;
  }
}
export default withUserContext(LatexEditor);
