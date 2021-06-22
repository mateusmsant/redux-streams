import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import { ReactComponent as Spinner } from "../../res/spinner.svg";

class StreamForm extends React.Component {
  state = { loading: false };

  renderError = ({ touched, error }) => {
    if (error && touched) {
      return (
        <div className="ui error message" style={{ margin: "5px 0px" }}>
          <div>{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, multiline, meta }) => {
    return (
      <>
        <TextField
          {...input}
          label={label}
          multiline={multiline ? true : false}
          autoComplete="off"
          style={{ marginTop: "5px" }}
        />
        <div>{this.renderError(meta)}</div>
      </>
    );
  };

  onSubmit = (formValues) => {
    this.setState({
      loading: true,
    });
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Container maxWidth="sm">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
          }}
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field name="title" component={this.renderInput} label="Title" />
          <Field
            name="description"
            component={this.renderInput}
            label="Description"
            multiline
          />
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            style={{
              width: "50%",
              alignSelf: "center",
              marginTop: "5px",
              color: "#ff0000",
            }}
            disabled={this.props.invalid ? true : false}
          >
            {this.props.action}
          </Button>
          {this.state.loading && (
            <Spinner
              style={{ width: "15%", height: "auto", margin: "0 auto" }}
            />
          )}
        </form>
      </Container>
    );
  }
}

const hasOnlyEmptySpaces = (value) => {
  return value.replace(/^\s+/, "").replace(/\s+$/, "") === "";
};

const validate = (formValues) => {
  const errors = {};
  const { title, description } = formValues;
  if (!title || hasOnlyEmptySpaces(title)) {
    errors.title = "You must enter a title";
  }
  if (!description || hasOnlyEmptySpaces(description)) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
