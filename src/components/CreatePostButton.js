import React from 'react';
import {Button, Modal, message} from 'antd';
import $ from 'jquery';
import {WrappedPostForm} from "./CreatePostForm";
import {POS_KEY, AUTH_PREFIX, API_ROOT, TOKEN_KEY, LOC_SHAKE} from "../constants"


export class CreatePostButton extends React.Component{
    state = {
        visible: false,
        confirmLoading : false
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({confirmLoading: true});
        this.form.validateFields((err, values) => {
            if (!err) {
                const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
                const formData = new FormData();
                formData.set('lat', lat + Math.random() * LOC_SHAKE * 2 - LOC_SHAKE);
                formData.set('lon', lon + Math.random() * LOC_SHAKE * 2 - LOC_SHAKE);
                formData.set('message', values.message);
                formData.set('image', values.image[0].originFileObj);

                $.ajax({
                    url : `${API_ROOT}/post`,
                    method : 'POST',
                    data : formData,
                    headers : {
                        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
                    },
                    processData: false,
                    contentType: false,
                    dataType: 'text',
                }).then(() => {
                    message.success('Created a post successfully!');
                    this.form.resetFields();
                    this.setState({confirmLoading : false, visible : false});
                    this.props.loadNearbyPosts();
                }, (response) => {
                    message.error(response.responseText);
                    this.setState({confirmLoading : false, visible : false});
                }).catch((error)=>{
                    console.log(error);
                })
            }
        })
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Create New Post</Button>
                <Modal
                    title="Create New Post"
                    visible={this.state.visible}
                    confirmLoading={this.state.confirmLoading}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <WrappedPostForm ref={this.saveFormRef}/>
                </Modal>
            </div>
        );
    }
}