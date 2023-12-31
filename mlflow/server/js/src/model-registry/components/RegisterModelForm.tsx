import React from 'react';
import { Form, Input, Select } from '@databricks/design-system';

import './RegisterModelForm.css';

const { Option, OptGroup } = Select;
const { TextArea } = Input;

const CREATE_NEW_MODEL_LABEL = 'Create New Model';
// Include 'CREATE_NEW_MODEL_LABEL' as part of the value for filtering to work properly. Also added
// prefix and postfix to avoid value conflict with actual model names.
export const CREATE_NEW_MODEL_OPTION_VALUE = `$$$__${CREATE_NEW_MODEL_LABEL}__$$$`;
export const SELECTED_MODEL_FIELD = 'selectedModel';
export const MODEL_NAME_FIELD = 'modelName';
export const DESCRIPTION_FIELD = 'description';

// This can be enabled after we support description in CreatModel & CreateModelVersion
const ENABLE_DESCRIPTION = false;

type Props = {
  modelByName?: any;
  onSearchRegisteredModels: (...args: any[]) => any;
  innerRef: any;
};

type State = any;

export class RegisterModelForm extends React.Component<Props, State> {
  state = {
    selectedModel: null,
  };

  handleModelSelectChange = (selectedModel: any) => {
    this.setState({ selectedModel });
  };

  modelNameValidator = (rule: any, value: any, callback: any) => {
    const { modelByName } = this.props;
    callback(modelByName[value] ? `Model "${value}" already exists.` : undefined);
  };

  handleFilterOption = (input: any, option: any) => {
    const value = (option && option.value) || '';
    return value.toLowerCase().indexOf(input.toLowerCase()) !== -1;
  };

  renderModel(model: any) {
    return (
      <Option value={model.name} key={model.name}>
        {model.name}
      </Option>
    );
  }
  render() {
    const { modelByName, innerRef } = this.props;
    const { selectedModel } = this.state;
    const creatingNewModel = selectedModel === CREATE_NEW_MODEL_OPTION_VALUE;
    return (
      // @ts-expect-error TS(2322): Type '{ children: (Element | null)[]; ref: any; la... Remove this comment to see the full error message
      <Form ref={innerRef} layout='vertical' className='register-model-form'>
        {/* "+ Create new model" OR "Select existing model" */}
        <Form.Item
          label='Model'
          name={SELECTED_MODEL_FIELD}
          rules={[{ required: true, message: 'Please select a model or create a new one.' }]}
        >
          <Select
            dropdownClassName='model-select-dropdown'
            onChange={this.handleModelSelectChange}
            placeholder='Select a model'
            filterOption={this.handleFilterOption}
            onSearch={this.props.onSearchRegisteredModels}
            // @ts-expect-error TS(2769): No overload matches this call.
            showSearch
          >
            <Option value={CREATE_NEW_MODEL_OPTION_VALUE} className='create-new-model-option'>
              <i className='fa fa-plus fa-fw' style={{ fontSize: 13 }} /> {CREATE_NEW_MODEL_LABEL}
            </Option>
            <OptGroup label='Models'>
              {Object.values(modelByName).map((model) => this.renderModel(model))}
            </OptGroup>
          </Select>
        </Form.Item>

        {/* Name the new model when "+ Create new model" is selected */}
        {creatingNewModel ? (
          <Form.Item
            label='Model Name'
            name={MODEL_NAME_FIELD}
            rules={[
              { required: true, message: 'Please input a name for the new model.' },
              { validator: this.modelNameValidator },
            ]}
          >
            <Input placeholder='Input a model name' />
          </Form.Item>
        ) : null}

        {/* Model/Model Version Description */}
        {ENABLE_DESCRIPTION && selectedModel ? (
          <Form.Item label='Description' name={DESCRIPTION_FIELD}>
            <TextArea
              rows={3}
              placeholder={`Description for the new ${creatingNewModel ? 'model' : 'version'}`}
            />
          </Form.Item>
        ) : null}

        {/* Explanatory text shown when existing model is selected */}
        {selectedModel && !creatingNewModel ? (
          <p className='modal-explanatory-text'>
            The model will be registered as a new version of {selectedModel}.
          </p>
        ) : null}
      </Form>
    );
  }
}
