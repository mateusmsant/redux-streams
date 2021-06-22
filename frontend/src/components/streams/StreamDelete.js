import React, { useEffect } from "react";
import Modal from "../modal/Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";
import { connect } from "react-redux";

const StreamDelete = ({
  deleteStream,
  fetchStream,
  stream,
  match: { params },
}) => {
  useEffect(() => {
    fetchStream(params.id);
    // eslint-disable-next-line
  }, []);

  if (!stream) {
    return (
      <Spinner style={{ width: "10%", height: "auto", margin: "400px auto" }} />
    );
  }

  const { title, id } = stream;

  const redirect = () => history.push("/");

  const onDeleteClick = (id) => {
    console.log(id);
    deleteStream(id);
  };

  const actions = (
    <>
      <button className="ui button negative" onClick={() => onDeleteClick(id)}>
        Delete
      </button>
      <button className="ui button" onClick={redirect}>
        Cancel
      </button>
    </>
  );

  return (
    <div>
      <Modal
        header="Delete stream"
        content={`Are you sure you want to delete the stream ${title}?`}
        actions={actions}
        onDismiss={redirect}
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
  deleteStream,
})(StreamDelete);
