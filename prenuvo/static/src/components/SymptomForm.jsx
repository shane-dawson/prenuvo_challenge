import { Button, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/SymptomForm.scss';
import { connect } from 'react-redux';
import { FieldArray, Formik } from 'formik';
import { fetchFormFields } from '../actions';

const Input = ({ name, type, value, selection, arrayHelpers }) => (
  <label>
    <input
      name={name}
      type={type}
      value={value}
      checked={selection.includes(value)}
      onChange={e => {
        if (e.target.checked) {
          if (type === 'radio') arrayHelpers.pop();
          arrayHelpers.push(value);
        } else {
          const idx = selection.indexOf(value);
          arrayHelpers.remove(idx);
        }
      }}
    />
    {value}
  </label>
);

class SymptomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formReady: false };
  }

  componentDidMount() {
    this.props.fetchFormFields().then(() => {
      this.setState(() => ({ formReady: true }));
    });
  }

  getFieldArrayValue = (values, keys) => {
    if (!keys.includes('.')) return values[keys];
    return keys
      .split('.')
      .reduce((cur, key) => (key in cur ? cur[key] : []), values);
  };

  getFieldArray({ title, choices, type, label }, values) {
    const val = this.getFieldArrayValue(values, title);
    return (
      <>
        <h3>{title.split('.')[0]}</h3>
        <FieldArray
          name={title}
          render={arrayHelpers => (
            <div>
              <h4>{label}</h4>
              <div className="form-groups">
                {choices.map(choice => (
                  <Input
                    key={choice}
                    name={title}
                    type={type}
                    value={choice}
                    arrayHelpers={arrayHelpers}
                    selection={val}
                  />
                ))}
              </div>
            </div>
          )}
        />
      </>
    );
  }

  getChildFormArrays(children, field, vocab, values) {
    return (
      <Panel className="form-children">
        {children.map(child => {
          const childTitle = `${field}.${child.title}`;
          const childObj = {
            ...child,
            title: childTitle,
          };
          if (field in vocab && child.title in vocab[field]) {
            childObj.choices = vocab[field][child.title];
          }
          return this.getFieldArray(childObj, values);
        })}
      </Panel>
    );
  }

  render() {
    const { formData } = this.props;
    const { formReady } = this.state;
    const initialState = {};
    formData.fields.forEach(({ title }) => {
      initialState[title] = [];
    });
    const { fields, vocab } = formData;
    return (
      formReady && (
        <div className="SymptomForm">
          <Formik
            initialValues={initialState}
            onSubmit={values =>
              setTimeout(() => {
                alert(JSON.stringify(values, null, 4));
              }, 100)
            }
            render={({ values, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {fields.map(section => {
                  const { title, children } = section;
                  return (
                    <div className="form-section">
                      {this.getFieldArray(section, values)}
                      {children &&
                        values[title].map(field =>
                          this.getChildFormArrays(
                            children,
                            field,
                            vocab,
                            values,
                          ),
                        )}
                    </div>
                  );
                })}
                <div className="form-button">
                  <Button type="submit" bsStyle="primary">
                    Submit
                  </Button>
                </div>
              </form>
            )}
          />
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  formData: state.reducer.formData,
});

const mapDispatchToProps = dispatch => ({
  fetchFormFields: args => dispatch(fetchFormFields(args)),
});

SymptomForm.propTypes = {
  fetchFormFields: PropTypes.func,
  formData: PropTypes.arrayOf(PropTypes.object),
};

SymptomForm.defaultProps = {
  formData: { fields: [], vocab: [] },
};

export default (SymptomForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SymptomForm));
