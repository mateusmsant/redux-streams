import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
    this.fadeOut = true;
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content row">
            <div>
              {stream.title}
              <div className="description">{stream.description}</div>
            </div>
          </div>
        </div>
      );
    });
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "0px 3px" }}
            >
              Edit
            </Button>
          </Link>
          <Link to={`/streams/delete/${stream.id}`}>
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: "0px 3px" }}
            >
              Delete
            </Button>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <Container maxWidth="lg">
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3>Streams</h3>
          <div className="ui celled list">{this.renderList()}</div>
          <div style={{ margin: "0 auto" }}>
            {this.props.isSignedIn && (
              <Link to="/streams/new" className="nav-link">
                Create a stream
              </Link>
            )}
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  fetchStreams,
})(StreamList);
