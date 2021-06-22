import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ReactComponent as Spinner } from "../../res/spinner.svg";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = ({ fetchStream, match: { params }, stream, editStream }) => {
  useEffect(() => {
    fetchStream(params.id);
    // eslint-disable-next-line
  }, []);

  if (!stream) {
    return (
      <Spinner style={{ width: "10%", height: "auto", margin: "0 auto" }} />
    );
  }

  const { title, description } = stream;

  const onSubmit = (formValues) => {
    editStream(params.id, formValues);
  };

  return (
    <div>
      <StreamForm
        onSubmit={onSubmit}
        action="update"
        initialValues={{ title, description }}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, {
  fetchStream,
  editStream,
})(StreamEdit);
