import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import moment from "moment";


const Movie = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMovie(id);
  }, [id]);

  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col md={4}>
            <Card.Img 
              src={movie.poster ? movie.poster : "https://via.placeholder.com/300x450"} 
              style={{ width: '100%', borderRadius: '8px' }}
              onError={(e) => { e.target.src = "https://via.placeholder.com/300x450"; }}
            />
          </Col>
          <Col md={8}>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {movie.plot}
                </Card.Text>
                {props.user && (
                  <Link to={"/movies/" + id + "/review"} className="btn btn-primary">
                    Add Review
                  </Link>
                )}
              </Card.Body>
            </Card>
            <br />
            <h2 className="mb-4">Reviews</h2>
            {movie.reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              movie.reviews.map((review, index) => {
                return (
                  <Card key={index} className="mb-3">
                    <Card.Body>
                      <Card.Title style={{ fontSize: '1.1rem' }}>
                        {review.name} reviewed on {moment(review.date).format("Do MMMM YYYY")}
                      </Card.Title>
                      <Card.Text>
                        "{review.review}"
                      </Card.Text>
                      {props.user && props.user.id === review.user_id && (
                        <Row>
                          <Col>
                            <Link
                              to={{
                                pathname: "/movies/" + id + "/review",
                                state: { currentReview: review },
                              }}
                              className="btn btn-sm btn-outline-info"
                            >
                              Edit
                            </Link>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="ms-2"
                              onClick={() => {
                                /* implementation for delete */
                              }}
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </Card.Body>
                  </Card>
                );
              })
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
