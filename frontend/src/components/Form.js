import React from 'react';
import { isJustWhitespace, removeExcessWhitespace } from "../utils/strings";
import { styles } from "../utils/styles";
import _ from 'lodash';
import { colors, palette } from "../utils/colors";
import { IconContext } from 'react-icons';
import { FaCheck, FaExclamationCircle } from 'react-icons/fa';
import PedagogicalGoalsInput from "./PedagogicalGoalsInput";
import ProblemsInput from "./ProblemsInput";
import { withUserContext } from "./UserState";
import { Tooltip, OverlayTrigger , Badge} from 'react-bootstrap';
import LatexEditor from "./LatexEditor";

function parseTitle({ value }) {
  if (isJustWhitespace(value)) {
    return { validity: 'partial' };
  }
  return { validity: 'valid', parsed: value };
}

function parseSelect({ value }) {
  return { validity: 'valid', parsed: value };
}

function parseInteger({ value, min, max }) {
  // if (isJustWhitespace(value)) {
  //   return { validity: 'partial' };
  // }
  if (min == null) {
    min = -Infinity;
  }
  if (max == null) {
    max = Infinity;
  }
  if (!(min <= +value && +value <= max)) {
    return { validity: 'invalid' };
  }
  return { validity: 'valid', parsed: +value };
}

function parseDate({ value }) {
  if (value.length === 0) {
    return { validity: 'partial' };
  }
  return { validity: 'valid', parsed: value };
}

function parseLearningGoals({ value }) {
  return { validity: 'valid', parsed: value };
}

function parseProblems({ value }) {
  if (value.length === 0) {
    return { validity: 'partial' };
  }
  return { validity: 'valid', parsed: value };
}

function parseTime({ value }) {
  if (value.length === 0) {
    return { validity: 'partial' };
  }
  return { validity: 'valid', parsed: value };
}

const types = {
  title: { parse: parseTitle, },
  select: { parse: parseSelect, },
  integer: { parse: parseInteger, htmlType: 'number' },
  date: { parse: parseDate, htmlType: 'date' },
  learningGoals: { parse: parseLearningGoals, },
  latex: { parse: parseTitle },
  password: { parse: parseTitle, htmlType: 'password' },
  problems: { parse: parseProblems },
  time: { parse: parseTime, htmlType: 'time' },
};

const FormContext = React.createContext();

export function withFormContext(Component) {
  return props => <FormContext.Consumer>
    {value => <Component {...props} {...value}/>}
  </FormContext.Consumer>;
}

let Field = class extends React.Component {
  onChangeValue = value => {
    const { onChangeField, fieldKey } = this.props;
    onChangeField({ fieldKey, value });
  };

  onChangeEvent = event => {
    this.onChangeValue(event.target.value);
  };

  componentDidMount() {
    const { onMountFieldComponent, fieldKey } = this.props;
    const type = types[ this.props.type ];
    onMountFieldComponent({ fieldKey, type });
  }

  componentWillUnmount() {
    const { onUnmountFieldComponent, fieldKey } = this.props;
    onUnmountFieldComponent({ fieldKey })
  }

  render() {
    const { fieldKey, label, values, options, min, max, topics } = this.props;
    const type = types[ this.props.type ];
    const value = values[ fieldKey ];
    const { validity } = type.parse({ ...this.props, value });
    const partialColor = ({
      invalid: palette.error,
      partial: colors.lightGray,
      valid: palette.good,
    })[ validity ];
    const labelColor = ({
      invalid: palette.error,
      partial: 'black',
      valid: palette.good,
    })[ validity ];
    const color = partialColor;

    return <div style={styles.field}>
      <div style={styles.fieldLabel({ color: labelColor })}>
        {
          this.props.tooltip !== undefined ?
          <span>{label}
            <OverlayTrigger placement="right" overlay={<Tooltip>{this.props.tooltip}</Tooltip>}>
              <Badge pullRight={false} style={{marginLeft: '6px'}}>?</Badge>
            </OverlayTrigger>
            </span>
            :
            <span>{label}</span>
        }
        </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flex: 1 }}>
          {this.props.type === 'problems' ? <ProblemsInput
            value={value}
            onChange={this.onChangeValue}
            style={styles.fieldInput({ color })}
            topics={topics}
          /> : this.props.type === 'latex' ?
            /*<textarea
              value={value}
              onChange={this.onChangeEvent}
              style={styles.fieldInput({ color })}
            />*/
            <LatexEditor value={value} color={color} onChange={this.onChangeEvent}/>
            : this.props.type === 'learningGoals' ?
              <PedagogicalGoalsInput
                topics={options}
                label={label}
                onChange={this.onChangeValue}
                style={styles.fieldInput({ color })}
                value={value}
                color={color}
              /> : this.props.type === 'select' ? <select
                style={styles.fieldInput({ color })}
                value={value}
                onChange={this.onChangeEvent}
              >
                {options.map(({ value, label }) => <option value={value}>
                  {label}
                </option>)}
              </select> : <input
                type={type.htmlType || 'text'}
                value={value}
                onChange={this.onChangeEvent}
                style={styles.fieldInput({ color })}
                min={min} max={max}
              />}
        </div>
        <div style={styles.validationIcon}>
          {validity === 'invalid' ?
            <FaExclamationCircle color={color}/>
            : <FaCheck color={color}/>}
        </div>
      </div>
    </div>;
  }
};
Field = withFormContext(Field);

let SubmitButton = class extends React.Component {
  onClick = () => {
    const { onSubmit, values } = this.props;
    onSubmit(values);
  };

  render() {
    const { values, fields, text, locale } = this.props;
    console.log('validating form...');
    const isValid = _.every(values, (value, fieldKey) => {
      const field = fields[ fieldKey ];
      if (field == null) {
        console.log(`${fieldKey} is null`);
        return false;
      }
      const { parse } = field.type;
      const { validity } = parse({ value });
      if (validity !== 'valid') {
        console.log(`${fieldKey} is ${validity}`);
        return false;
      }
      return true;
    });
    if (isValid) {
      console.log('form is valid');
    }
    const disabled = this.props.disabled || !isValid;

    return <button
      disabled={disabled}
      style={styles.button({ disabled })}
      onClick={this.onClick}
    >
      {text || locale.submit}
    </button>;
  }
};
SubmitButton = withFormContext(withUserContext(SubmitButton));

export default class Form extends React.Component {
  static Field = Field;
  static SubmitButton = SubmitButton;

  state = {
    fields: {},
  };

  onMountFieldComponent = ({ fieldKey, ...props }) => {
    console.log('onMountFieldComponent');
    this.setState(prev => ({
      fields: { ...prev.fields, [ fieldKey ]: props },
    }));
  };

  onChangeFieldComponent = ({ fieldKey, ...props }) => {
    this.setState(prev => ({
      fields: { ...prev.fields, [ fieldKey ]: props },
    }));
  };

  onUnmountFieldComponent = (fieldKey) => {
    this.setState(prev => ({
      fields: _.omit(prev.fields, fieldKey),
    }));
  };

  render() {
    const { children, style } = this.props;
    const context = {
      ...this.props, ...this.state,
      onMountFieldComponent: this.onMountFieldComponent,
      onChangeFieldComponent: this.onChangeFieldComponent,
      onUnmountFieldComponent: this.onUnmountFieldComponent,
    };

    return <FormContext.Provider value={context}>
      <div style={style}>{children}</div>
    </FormContext.Provider>;
  }
}
