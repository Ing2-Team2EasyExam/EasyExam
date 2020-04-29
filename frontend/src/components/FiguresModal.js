import React from 'react';
import { withUserContext } from "./UserState";
import Modal from "./Modal";
import { colors, palette } from "../utils/colors";
import { styles } from "../utils/styles";

export function latexFilename(filename) {
  return filename.replace(/ /g, '_');
}

function formatFigure(file) {
  const filename = latexFilename(file.name);
  return (
    `\\begin{figure}[H]
    \\includegraphics[width=0.8\\textwidth]{${filename}}
\\end{figure}`
  );
}

let AddImagePreview = class extends React.Component {
  render() {
    const { locale, onChangeFile } = this.props;

    return <div style={styles.imagePreview}>
      <h1>{locale.addFigure}</h1>
      <input type='file' onChange={onChangeFile}/>
    </div>;
  }
};
AddImagePreview = withUserContext(AddImagePreview);

let ImagePreview = class extends React.Component {
  render() {
    const { file, onRemove, locale, isSelected, onClick } = this.props;

    return <div
      style={{
        ...styles.imagePreview,
        borderColor: isSelected ? colors.skyBlue : colors.neutralGray,
        borderWidth: isSelected ? 6 : 1,
      }}
    >
      <img
        src={URL.createObjectURL(file)}
        style={{
          width: 'auto', height: 'auto',
          maxWidth: '100%', maxHeight: '100%',
        }}
        onClick={onClick}
      />
      <div style={{
        position: 'absolute',
        top: 0, right: 0,
      }}>
        <button
          style={styles.button({ backgroundColor: palette.error })}
          onClick={onRemove}
        >
          {locale.remove}
        </button>
      </div>
    </div>;
  }
};
ImagePreview = withUserContext(ImagePreview);

class FiguresModal extends React.Component {
  state = {
    selectedIndex: null,
    duplicatedFilenames: null,
  };

  onChangeFile = event => {
    const { value: prevFiles, onChangeValue } = this.props;
    const newFile = event.target.files[0];
    const newName = latexFilename(newFile.name);
    const twinFile = prevFiles.find(file =>
      latexFilename(file.name) === newName
    );
    if (twinFile != null) {
      this.setState({
        selectedIndex: prevFiles.indexOf(twinFile),
        duplicatedFilenames: [twinFile.name, newFile.name],
      });
    }
    else {
      onChangeValue([...prevFiles, newFile]);
      this.setState({
        selectedIndex: prevFiles.length,
        duplicatedFilenames: null,
      });
    }
  };

  onClickFigure = index => {
    this.setState(prev => ({
      selectedIndex: prev.selectedIndex === index ?
        null : index,
      duplicatedFilenames: null,
    }));
  };

  onRemoveFigure = index => {
    const { value, onChangeValue } = this.props;
    this.setState(prev => ({
      selectedIndex: prev.selectedIndex == null ?
        null : prev.selectedIndex < index ?
          prev.selectedIndex : prev.selectedIndex === index ?
            null : prev.selectedIndex - 1,
    }), () => {
      onChangeValue(value.filter((x, i) => i !== index));
    });
  };

  render() {
    const { selectedIndex, duplicatedFilenames } = this.state;
    const { locale, value: files } = this.props;

    return <Modal {...this.props} title={locale.problemFigures}>
      <div style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        position: 'relative',
        overflowX: 'scroll',
      }}>
        {files.map((file, index) => <ImagePreview
          file={file} key={index.toString()}
          onRemove={() => this.onRemoveFigure(index)}
          onClick={() => this.onClickFigure(index)}
          isSelected={index === selectedIndex}
        />)}
        <AddImagePreview onChangeFile={this.onChangeFile}/>
      </div>

      {duplicatedFilenames != null ? <p style={{ color: palette.error, fontWeight: 'bold' }}>
        {locale.formatDuplicatedFilenames(duplicatedFilenames)}
      </p> : null}
      {selectedIndex != null ? <pre>
        {formatFigure(files[ selectedIndex ])}
      </pre> : files.length >= 1 ? <p>
        {locale.selectFigureHelp}
      </p> : null}
    </Modal>;
  }
}

export default withUserContext(FiguresModal);