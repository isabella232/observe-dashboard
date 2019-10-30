import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { themeVal } from '../../styles/utils/general';
import collecticon from '../../styles/collecticons';

import App from '../common/app';
import UhOh from '../uhoh';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody,
  InpageBodyInner
} from '../common/Inpage';

import Prose from '../../styles/type/prose';

import Button from '../../styles/button/button';
import ButtonGroup from '../../styles/button/group';

import Form from '../../styles/form/form';
import {
  FormFieldset,
  FormFieldsetHeader,
  FormFieldsetBody
} from '../../styles/form/fieldset';
import FormLegend from '../../styles/form/legend';
import {
  FormGroup,
  FormGroupHeader,
  FormGroupBody
} from '../../styles/form/group';
import FormLabel from '../../styles/form/label';
import FormInput from '../../styles/form/input';
import { FormCheckable, FormCheckableGroup } from '../../styles/form/checkable';
import FormSelect from '../../styles/form/select';
import FormTextarea from '../../styles/form/textarea';
import FormToolbar from '../../styles/form/toolbar';
import {
  FormHelper,
  FormHelperMessage,
  FormHelperCounter
} from '../../styles/form/helper';
import config from '../../config';

// Extend the component previously created to change the background
// This is needed to see the achromic buttons.

const Ul = styled.ul`
  list-style: none !important;
  margin: 0 !important;
  padding: 2rem !important;

  > li {
    margin-bottom: 1rem;
  }

  > li:last-child {
    margin-bottom: 0;
  }
`;

const DarkUl = styled(Ul)`
  background: ${themeVal('color.base')};
`;

// Extend a button to add an icon.

const ButtonIconBrand = styled(Button)`
  ::before {
    ${collecticon('plus')}
  }
`;

const RemoveButton = styled(Button)`
  ::before {
    ${collecticon('trash-bin')}
  }
`;

const InfoButton = styled(Button)`
  ::before {
    ${collecticon('circle-information')}
  }
`;

// Below the differente button variations and sizes to render all buttons.

const variations = [
  'base-raised-light',
  'base-raised-semidark',
  'base-raised-dark',
  'base-plain',
  'primary-raised-light',
  'primary-raised-semidark',
  'primary-raised-dark',
  'primary-plain',
  'danger-raised-light',
  'danger-raised-dark',
  'danger-plain'
];
const lightVariations = ['achromic-plain', 'achromic-glass'];

const sizes = ['small', 'default', 'large', 'xlarge'];

export default class Sandbox extends React.Component {
  render () {
    if (config.environment === 'production') return <UhOh />;

    return (
      <App pageTitle='Sandbox'>
        <Inpage>
          <InpageHeader />
          <InpageBody>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Sandbox</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
            <InpageBodyInner>
              <Prose>
                <h2>Form elements</h2>
                <Form>
                  <FormFieldset>
                    <FormFieldsetHeader>
                      <FormLegend>Form legend</FormLegend>
                      <RemoveButton
                        variation='base-plain'
                        size='small'
                        hideText
                      >
                        Remove fieldset
                      </RemoveButton>
                    </FormFieldsetHeader>
                    <FormFieldsetBody>
                      <FormGroup>
                        <FormGroupHeader>
                          <FormLabel htmlFor='input-text-a'>
                            Form label
                          </FormLabel>
                          <FormToolbar>
                            <InfoButton
                              variation='base-plain'
                              size='small'
                              hideText
                              data-tip='This is a very helpful tooltip.'
                            >
                              Learn more
                            </InfoButton>
                            <ReactTooltip
                              effect='solid'
                              className='type-primary'
                            />
                          </FormToolbar>
                        </FormGroupHeader>
                        <FormGroupBody>
                          <FormInput
                            type='text'
                            size='large'
                            id='input-text-a'
                            placeholder='This is a text input'
                          />
                          <FormHelper>
                            <FormHelperMessage>
                              This is some help text.
                            </FormHelperMessage>
                            <FormHelperCounter>0 / 80</FormHelperCounter>
                          </FormHelper>
                        </FormGroupBody>
                      </FormGroup>

                      <FormGroup>
                        <FormGroupHeader>
                          <FormLabel>Form label</FormLabel>
                        </FormGroupHeader>
                        <FormGroupBody>
                          <FormCheckableGroup>
                            <FormCheckable
                              checked={undefined}
                              type='checkbox'
                              name='checkbox-a'
                              id='checkbox-a'
                            >
                              Checkbox A
                            </FormCheckable>
                            <FormCheckable
                              checked={undefined}
                              type='checkbox'
                              name='checkbox-b'
                              id='checkbox-b'
                            >
                              Checkbox B
                            </FormCheckable>
                          </FormCheckableGroup>
                        </FormGroupBody>
                      </FormGroup>

                      <FormGroup>
                        <FormGroupHeader>
                          <FormLabel>Form label</FormLabel>
                        </FormGroupHeader>
                        <FormGroupBody>
                          <FormCheckableGroup>
                            <FormCheckable
                              textPlacement='right'
                              checked={undefined}
                              type='radio'
                              name='radio-a'
                              id='radio-a1'
                            >
                              Radio A
                            </FormCheckable>
                            <FormCheckable
                              textPlacement='right'
                              checked={undefined}
                              type='radio'
                              name='radio-a'
                              id='radio-a2'
                            >
                              Radio B
                            </FormCheckable>
                            <FormCheckable
                              textPlacement='right'
                              checked={undefined}
                              type='radio'
                              name='radio-a'
                              id='radio-a3'
                            >
                              Radio C
                            </FormCheckable>
                            <FormCheckable
                              textPlacement='right'
                              checked={undefined}
                              type='radio'
                              name='radio-a'
                              id='radio-a4'
                            >
                              Radio D
                            </FormCheckable>
                          </FormCheckableGroup>
                        </FormGroupBody>
                      </FormGroup>

                      <FormFieldset>
                        <FormFieldsetHeader>
                          <FormLegend>Form legend</FormLegend>
                          <RemoveButton
                            variation='base-plain'
                            size='small'
                            hideText
                            data-tip='This is a super helpful tooltip.'
                          >
                            Remove fieldset
                          </RemoveButton>
                        </FormFieldsetHeader>
                        <FormFieldsetBody>
                          <FormGroup>
                            <FormGroupHeader>
                              <FormLabel htmlFor='textarea-b'>
                                Form label
                              </FormLabel>
                            </FormGroupHeader>
                            <FormGroupBody>
                              <FormTextarea
                                size='large'
                                id='textarea-b'
                                placeholder='This is a textarea'
                              />
                              <FormHelper>
                                <FormHelperMessage>
                                  This is an error message.
                                </FormHelperMessage>
                              </FormHelper>
                            </FormGroupBody>
                          </FormGroup>
                        </FormFieldsetBody>
                      </FormFieldset>

                      <FormGroup>
                        <FormGroupHeader>
                          <FormLabel htmlFor='select-a' optional>
                            Form label
                          </FormLabel>
                        </FormGroupHeader>
                        <FormGroupBody>
                          <FormSelect size='large' id='select-a'>
                            <option value='option-1'>Option 1</option>
                            <option value='option-2'>Option 2</option>
                            <option value='option-3'>Option 3</option>
                            <option value='option-4'>Option 4</option>
                          </FormSelect>
                          <FormHelper>
                            <FormHelperMessage>
                              This is some help text.
                            </FormHelperMessage>
                          </FormHelper>
                        </FormGroupBody>
                      </FormGroup>

                      <FormGroup>
                        <FormGroupHeader>
                          <FormLabel htmlFor='textarea-a'>Form label</FormLabel>
                        </FormGroupHeader>
                        <FormGroupBody>
                          <FormTextarea
                            size='large'
                            id='textarea-a'
                            placeholder='This is a textarea'
                            invalid
                          />
                          <FormHelper>
                            <FormHelperMessage>
                              This is an error message.
                            </FormHelperMessage>
                          </FormHelper>
                        </FormGroupBody>
                      </FormGroup>
                    </FormFieldsetBody>
                  </FormFieldset>
                </Form>

                <h2>Button Group</h2>
                <ButtonGroup orientation='horizontal'>
                  <Button variation='base-raised-light'>First</Button>
                  <Button variation='base-raised-light'>Second</Button>
                  <Button variation='base-raised-light'>Third</Button>
                  <Button variation='base-raised-light'>Last</Button>
                </ButtonGroup>
                <ButtonGroup orientation='vertical'>
                  <Button variation='base-raised-light'>First</Button>
                  <Button variation='base-raised-light'>Second</Button>
                  <Button variation='base-raised-light'>Third</Button>
                  <Button variation='base-raised-light'>Last</Button>
                </ButtonGroup>
                <ButtonGroup orientation='horizontal'>
                  <ButtonIconBrand variation='base-raised-light'>
                    First
                  </ButtonIconBrand>
                  <ButtonIconBrand variation='base-raised-light'>
                    Second
                  </ButtonIconBrand>
                  <ButtonIconBrand variation='base-raised-light'>
                    Third
                  </ButtonIconBrand>
                </ButtonGroup>

                {variations.map(variation => (
                  <Ul key={variation}>
                    {sizes.map(size => (
                      <li key={size}>
                        <Button variation={variation} size={size}>
                          {size} - {variation}
                        </Button>
                      </li>
                    ))}
                  </Ul>
                ))}
                {lightVariations.map(variation => (
                  <DarkUl key={variation}>
                    {sizes.map(size => (
                      <li key={size}>
                        <Button variation={variation} size={size}>
                          {size} - {variation}
                        </Button>
                      </li>
                    ))}
                  </DarkUl>
                ))}
              </Prose>
            </InpageBodyInner>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}
