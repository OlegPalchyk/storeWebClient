import React, {Component} from 'react';
import {Button, FormControl, HelpBlock, ControlLabel, FormGroup, Grid, Col, Image} from 'react-bootstrap';
const FieldGroup = ({id, label, help, validationState, ...props})=> {
    return (
        <FormGroup controlId={id} validationState={validationState}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
};
class EditItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.item.title,
            price: this.props.item.price,
            description: this.props.item.description,
            fileUrl: this.props.item.images[0].url,
            file: null,
            showValid: false,
            errorFields: {},

        }
    }

    invalidForm() {
        let invalid = false;
        let errorFields = {};
        if (this.state.title.match((/^\s*$/)) || this.state.title.length === 0) {
            errorFields.title = true;
            invalid = true;
        }
        if (this.state.description.match((/^\s*$/)) || this.state.description.length === 0) {
            errorFields['description'] = true;
            invalid = true;
        }
        if(Number.isInteger(this.state.price)){
            if(this.state.price<0){
                errorFields['price'] = true;
                invalid = true;
            }
        }else{
            if (this.state.price.match((/^\s*$/)) || this.state.price.length === 0 || !this.state.price.match(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/)) {
                errorFields['price'] = true;
                invalid = true;
            }
        }


        return !invalid ? false : errorFields;
    }

    updateItem(e) {
        e.preventDefault();
        let a = this.invalidForm();
        if (a) {
            this.setState({
                errorFields: a
            });
            return;
        }
        let newItem = {
            "title": this.state.title,
            "price": +this.state.price,
            "description": this.state.description,

        };
        if(this.state.file){
            newItem.images = this.state.file
        }
        this.props.updateItem(this.props.item._id, newItem)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let errorFields = this.state.errorFields;
        if (name !== 'price') {

            if (value.match((/^\s*$/)) || value.length === 0) {
                errorFields[name] = true
            } else {
                errorFields[name] = false
            }
        } else {

            if (value.match((/^\s*$/)) || value.length === 0 || !value.match(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/)) {
                errorFields[name] = true
            } else {
                errorFields[name] = false
            }
        }
        this.setState({
            [name]: value,
            errorFields
        });
    }

    readFile(event) {
        let reader = new FileReader();
        let sentFile;
        let file =  sentFile = event.target.files[0];
        let fileType = file.type;
        let size = file.size;
        let imageTYpes = ["image/gif", "image/jpeg", "image/png"];
        if (imageTYpes.indexOf(fileType) === -1 || size >= 1024 * 1024 * 5) {
            let errorFields = this.state.errorFields;
            errorFields.file = true;
            return;
        }
        reader.onload = (file)=> {
            this.setState({
                fileUrl: file.target.result,
                file: sentFile,

            })
        };
        reader.readAsDataURL(file);
    }



    render() {
        return (
            <div className="create-item">
                <form method="POST" onSubmit={(e)=>this.updateItem(e)} ref="form-control">
                    <FieldGroup
                        id="formControlsTitle"
                        type="text"
                        label="Title"
                        placeholder="Enter Title"
                        name="title"
                        value={this.state.title}
                        onChange={(e)=> {
                            this.handleChange(e)
                        }}
                        maxLength={20}
                        validationState={'title' in this.state.errorFields ? this.state.errorFields.title ? "warning" : "success" : null}
                        help={this.state.errorFields.title ? 'Required' : false}
                    />
                    <FieldGroup
                        id="formControlsPrice"
                        label="Price"
                        type="text"
                        placeholder="Enter price"
                        name="price"
                        value={this.state.price}
                        maxLength={20}
                        onChange={(e)=> {
                            this.handleChange(e)
                        }}
                        validationState={'price' in this.state.errorFields ? this.state.errorFields.price ? "warning" : "success" : null}
                        help={this.state.errorFields.price ? 'Required and can contain only numbers' : false}
                    />


                    <Grid>
                        <Col xs={12} md={4} lg={3} >
                            <Image src={this.state.file} thumbnail />
                        </Col>
                        <Col xs={12} md={8} lg={9}>
                            <FieldGroup
                                id="formControlsFile"
                                type="file"
                                label="File"
                                name="file"
                                accept="image/*"
                                onChange={(e)=> {
                                    this.readFile(e)
                                }}
                                help={this.state.errorFields.file ? 'Image is required and max size is 3mb' : false}
                                validationState={'price' in this.state.errorFields ? this.state.errorFields.file ? "warning" : "success" : null}
                            />
                        </Col>

                    </Grid>
                    <FormGroup controlId="formControlsTextarea"
                               validationState={'description' in this.state.errorFields ? this.state.errorFields.description ? "warning" : "success" : null}>
                        <ControlLabel>Description</ControlLabel>
                        <FormControl maxLength={256} componentClass="textarea" placeholder="Enter description"
                                     name="description"
                                     value={this.state.description}
                                     onChange={(e)=> {
                                         this.handleChange(e)
                                     }}
                        />
                        {this.state.errorFields.description ? <HelpBlock>{'Required'}</HelpBlock> : null}
                    </FormGroup>
                    <Button type="button" onClick={()=>this.props.cancelEdit()}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Update
                    </Button>
                </form>

            </div>
        );
    }
}



export default EditItem;
