import React, {Component} from 'react';
import {Button, FormControl, HelpBlock, ControlLabel, FormGroup} from 'react-bootstrap';
import {connect} from "react-redux";
import {addItem, ADD_PRODUCT_SUCCESS} from "../../actions/products";
import './createItem.css';
const FieldGroup = ({id, label, help, validationState, ...props})=> {
    return (
        <FormGroup controlId={id} validationState={validationState}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
};
class CreateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            price: "",
            description: "",
            file: "",
            showValid: false,
            errorFields: {}
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
        if (this.state.price.match((/^\s*$/)) || this.state.price.length === 0 || !this.state.price.match(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/)) {
            errorFields['price'] = true;
            invalid = true;
        }
        if (this.state.file.length === 0) {
            errorFields['file'] = true;
            invalid = true;
        }
        return !invalid ? false : errorFields;
    }

    addItem(e) {
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
            "url": this.state.file,
            "description": this.state.description
        };
        this.props.dispatch(addItem(newItem));
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
        let file = event.target.files[0];
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
                file: file.target.result,

            })
        };
        reader.readAsDataURL(file);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.products.type === ADD_PRODUCT_SUCCESS) {
            this.props.history.push(`/products/${nextProps.products.lastAddedItemId}`);
        }
    }

    render() {
        return (
            <div className="create-item">
                <form method="POST" onSubmit={(e)=>this.addItem(e)} ref="form-control">
                    <FieldGroup
                        id="formControlsTitle"
                        type="text"
                        label="Title"
                        placeholder="Enter Title"
                        name="title"
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
                        maxLength={20}
                        onChange={(e)=> {
                            this.handleChange(e)
                        }}
                        validationState={'price' in this.state.errorFields ? this.state.errorFields.price ? "warning" : "success" : null}
                        help={this.state.errorFields.price ? 'Required and can contain only numbers' : false}
                    />
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
                    <FormGroup controlId="formControlsTextarea"
                               validationState={'description' in this.state.errorFields ? this.state.errorFields.description ? "warning" : "success" : null}>
                        <ControlLabel>Description</ControlLabel>
                        <FormControl maxLength={256} componentClass="textarea" placeholder="Enter description"
                                     name="description"
                                     onChange={(e)=> {
                                         this.handleChange(e)
                                     }}
                        />
                        {this.state.errorFields.description ? <HelpBlock>{'Required'}</HelpBlock> : null}
                    </FormGroup>
                    <Button type="submit">
                        Submit
                    </Button>
                </form>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const {products} = state;
    return {
        products
    }
}

export default connect(mapStateToProps)(CreateItem);
