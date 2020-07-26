import React, { Component } from 'react';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';



class Dishdetails extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }
    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
    renderComments(dish) {
        if (dish != null) {
            const dish_comments = dish.comments.map((comment) => {

                //const date = comment.date.substring(0,comment.date.indexOf('T'));

                var date = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                }).format(new Date(comment.date));
                return (
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {date}</p>
                    </div>
                );
            });

            return (
                <div>
                    <h4>Comments</h4>
                    {dish_comments}
                </div>

            );
        }
        else {
            return (
                <div></div>
            );
        }

    }


    render() {
        const dish = this.props.dish;
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(dish)}
                </div>
            </div>
        );
    }

}




export default Dishdetails;