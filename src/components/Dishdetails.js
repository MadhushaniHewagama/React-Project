import React, { Component } from 'react';
import { Label, Col, Row, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({ dish }) {
    return (
        <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
    <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>
    </FadeTransform>
    )

}

function RenderComments({comments, postComment, dishId}) {
    const cmnts = comments.map(comment => {
        return (
            <Stagger in>
            {comments.map((comment) => {
                return (
                    <Fade in>
                    <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                    </Fade>
                );
            })}
            </Stagger>
        )
    })
    return (
        <div className='col-12 col-md-5 m-1'>
            <h4> Comments </h4>
            <ul className='list-unstyled'>
                {cmnts}
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />

        </div>
    )


}


const DishDetail = (props) => {

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
  
   else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }

}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

    }
    render() {
        
        return (
            <div>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rate</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control"
                                    >
                                        <option value={1} selected>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea rows="6" model=".comment" id="comment" name="comment"
                                        placeholder="Comment"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button className='mt-2' type="submit" color="primary" toggle={this.toggleModal}>
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline className='ml-3' color="info" onClick={this.toggleModal}>
                    <span className='fa fa-pencil'></span> Submit Comment
                    </Button>
            </div>

        );
    }

}


export default DishDetail;