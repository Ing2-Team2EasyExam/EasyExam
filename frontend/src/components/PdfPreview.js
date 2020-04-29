import React from 'react';
import { withUserContext } from "./UserState";

const googleDocs = 'https://docs.google.com/gview';

class PdfPreview extends React.Component {
  render() {
    const { url, locale } = this.props;
    const googleViewer = `${googleDocs}?url=${url}&embedded=true`;

    return <iframe
      src={url.includes('localhost') ? url : googleViewer}
      style={{ width: '100%', height: '80vh' }}
      frameBorder={0}
      title={locale.pdfPreview}
    />;
  }
}

export default withUserContext(PdfPreview);