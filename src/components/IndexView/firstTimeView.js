import React from 'react';
import { observer } from 'mobx-react';
import { Button, Container, Dropdown, Grid, Header, Menu, Message, Step } from 'semantic-ui-react';
import moment from 'moment-timezone';

import AddAccountButtons from '../AddAccountButtons';
import AccountImportList from '../AccountImportList';

import { createAccounts } from '../../services/api';


import _ from 'lodash';

const FirstTimeView = observer(class FirstTimeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      steps: [
        { completed: false, active: true, icon: 'announcement', title: 'Accounts', description: 'Link accounts to share content'},
        { completed: false, active: false, icon: 'clock', title: 'Timezone', description: 'Determine when you want to share' },
        // { completed: false, active: false, icon: 'info', title: 'Review', description: 'Ready to publish awesome stories?' }
      ],
    }
  }

  isBackButtonDisabled = () => {
    // if step === first: disable else enable
    let activeStep = this.state.activeStep
    if(activeStep === 0) {
      return true;
    }
    return false;
  }

  isNextButtonDisabled = () => {
    /**
     * decides if next button is enabled on not
     * TODO: use switch for every step and enable disable accordngly.
     * NOTE: do not worry about the last step as next btn will be hidden.
     */
    if(this.props.facebookIds.length === 0) {
      return true;
    }
    return false;
  }

  isFinishButtonVisible = () => {
    // if step === last: enable else disable
    let { activeStep, steps } = this.state;
    if(activeStep === steps.length - 1) {
      return true;
    }
    return false;
  }

  onBackButtonClick = () => {
    /**
     * current: identify current step
     * mark current step as inactive
     * mark previous step as incomplete and active
     */
    let { steps, activeStep } = this.state;
    steps[activeStep].active = false;
    activeStep--;
    steps[activeStep].completed = false;
    steps[activeStep].active = true;
    this.setState({ steps, activeStep });
  }

  onNextButtonClick = () => {
    /**
     * current: identify current step
     * mark current step as complete, remove active from current step
     * mark the next state as active.
     */
    let { steps, activeStep } =  this.state;
    steps[activeStep].completed = true;
    steps[activeStep].active = false;
    activeStep++;
    steps[activeStep].active = true;
    this.setState({ steps, activeStep });
  }

  onFinishButtonClick = () => {
    /**
     * submit the selected ids and timezone to the api
     */
    let { facebookIds } = this.props;
    let facebookToken = this.props.facebookProfile.get('accessToken');
    createAccounts({facebookIds, facebookToken});
  }

  createTimezoneOptions = () => {
    /**
     * create options map for timezone select
     */
    const timezones = moment.tz.names();
    let options = timezones.map((timezone) => {return {text: timezone, value: timezone}});
    return options;
  }

  renderViewForStep = (step) => {
    switch (step) {
      case 0: return(
        <Grid>
          <Grid.Row>
            <AddAccountButtons { ...this.props }/>
          </Grid.Row>
          <Grid.Row>
            <Container>
              <AccountImportList { ...this.props }/>
            </Container>
          </Grid.Row>
        </Grid>
      );
      case 1: return(
        <Grid>
          <Grid.Row>
            <Container>
              <Message info>
                Select a timezone to schedule your posts. You can always change it later.
              </Message>
              <Header as='h5'>Timezone</Header>
              <Dropdown
                fluid search selection scrolling
                placeholder="Select a Timezone"
                options={this.createTimezoneOptions()}
                value={this.props.timezone}
                onChange={(e, { value }) => { this.props.setTimezone(value) }}
              />
            </Container>
          </Grid.Row>
        </Grid>

      );
      default: return(<h3>Nothing to show here..</h3>);
    }
  }

  render () {
    const steps = this.state.steps;
    return(
      <div>
        <Menu>
          <Menu.Item header as='h1'>Shareito</Menu.Item>
        </Menu>
        <Step.Group fluid items={steps}/>
        {
          this.props.accountError?
          <Message error>
            Unable to link accounts. If the problem exist please contact us!
          </Message> : ""
        }
        {this.renderViewForStep(this.state.activeStep)}
        <Grid>
          <Grid.Row>
            <Container>
              {
                this.isFinishButtonVisible() ?
                (<Button positive
                  loading={this.props.accountLoading}
                  floated="right"
                  onClick={this.onFinishButtonClick}
                >
                  Finish
                </Button>) :
                (<Button
                  floated="right"
                  disabled={this.isNextButtonDisabled()}
                  onClick={this.onNextButtonClick}
                >
                  Next
                </Button>)
              }
              <Button
                floated="right"
                disabled={this.isBackButtonDisabled()}
                onClick={this.onBackButtonClick}
              >
                Back
              </Button>
            </Container>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
})

export default FirstTimeView;
