import React from 'react'
import { observer } from 'mobx-react';
import {
  Button, Grid, Header,
  Icon
} from 'semantic-ui-react';
import Navbar from '../Navbar';

const UnauthorizedView = observer(class UnauthorizedView extends React.Component {
  render () {
    return(
      <div>
        <Navbar
          {...this.props}
        />
        {/* Image with call to action */}
        <Grid centered className="jumbotron">
          <Grid.Row>
            <Header as='h1' icon textAlign='center'>
              <Icon name='users' />
              Get social media under your control
              <Header.Subheader>
                Share post on multiple social media with just one click.
                Schedule content for future and get free.
                <br/>Use Shareito anlytics
                to see how your content is performing.
              </Header.Subheader>
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Button primary>Try It Now</Button>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
})

export default UnauthorizedView;
