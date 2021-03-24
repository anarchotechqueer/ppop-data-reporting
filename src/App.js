import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Select, DatePicker, InputNumber, Alert} from 'antd';

import { gapi } from "gapi-script";

import Header from './components/header';
import Container from './components/container';
import Content from './components/content';
import FormSection from './components/form-section';
import SignInScreen from './components/sign-in-screen';
import LoadingScreen from './components/loading-screen';

const { Option } = Select;

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [alert, setAlert] = useState(null);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const {outreachDate, outreachType, numNeedles, numPeopleReceivedSyringes, numPeople, numNaloxone, numUsedNaloxone, numUsedNaloxoneFromPPOP, numPeopleLived, numLivedFromPPOP, numNaloxoneTrainings, numMethPipes, numPeopleTurnedDownMethPipes, numSnortingKits, numWoundCare, numPolice} = values;
    const formattedOutreachDate = outreachDate.format("MM/DD/YYYY");

    const submitValues = [formattedOutreachDate, outreachType, numNeedles, numPeopleReceivedSyringes, numPeople, numNaloxone, numUsedNaloxone, numUsedNaloxoneFromPPOP, numPeopleLived, numLivedFromPPOP, numNaloxoneTrainings, numMethPipes, numPeopleTurnedDownMethPipes, numSnortingKits, numWoundCare, numPolice];
    const params = {
      // The ID of the spreadsheet to update.
      spreadsheetId: process.env.REACT_APP_SPREADSHEET_ID,
      // The A1 notation of a range to search for a logical table of data.Values will be appended after the last row of the table.
      range: process.env.REACT_APP_SHEET_NAME, //this is the default spreadsheet name, so unless you've changed it, or are submitting to multiple sheets, you can leave this
      // How the input data should be interpreted.
      valueInputOption: 'USER_ENTERED', //RAW = if no conversion or formatting of submitted data is needed. Otherwise USER_ENTERED
      // How the input data should be inserted.
      insertDataOption: 'INSERT_ROWS', //Choose OVERWRITE OR INSERT_ROWS
    };

    const valueRangeBody = {
      'majorDimension': 'ROWS', //log each entry as a new row (vs column)
      'values': [submitValues] //convert the object's values to an array
    };

    let request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then(function (response) {
      form.resetFields();
      setAlert({'type': 'success', 'message': 'Form submitted successfully'});
      setShowLoadingScreen(false);

    }, function (reason) {
      console.error('error: ' + reason.result.error.message);
      setAlert({'type': 'error', 'message': reason.result.error.message});
      setShowLoadingScreen(false);
    });
  };

  const signInCTA = (e) => {
    e.preventDefault();

    gapi.auth2.getAuthInstance().signIn();
  };

  const signOutCTA = (e) => {
    e.preventDefault();

    gapi.auth2.getAuthInstance().signOut();
    updateSignInStatus(false);
  }

  const closeAlert = (e) => {
    e.preventDefault();

    setAlert(null);
  }

  const updateSignInStatus = (signedIn) => {
    setIsSignedIn(signedIn);
    setShowLoadingScreen(false);
  };

  const initClient = useCallback(()=> { //provide the authentication credentials you set up in the Google developer console
    gapi.client.init({
      'apiKey': process.env.REACT_APP_API_KEY,
      'clientId': process.env.REACT_APP_CLIENT_ID,
      'scope': process.env.REACT_APP_SCOPE,
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(()=> {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus); //add a function called `updateSignInStatus` if you want to do something once a user is logged in with Google
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }, []);

  const handleClientLoad = useCallback(() => { //initialize the Google API
    gapi.load('client:auth2', initClient);
  }, [initClient])

  useEffect(() => {
    handleClientLoad();
  }, [handleClientLoad]);

  return (
    <>


    {isSignedIn && (
      <>
        {alert && (
          <Alert message={alert.message} type={alert.type} banner closable showIcon={false} onClose={closeAlert}/>
        )}

        <Header signOutCTA={signOutCTA} />

        <Container>
          <Content>
            <Form form={form} layout="vertical" size="large" onFinish={onFinish}>
              <FormSection title="General Info">
                <Form.Item name="outreachDate" label="Date of outreach" rules={[{ required: true,},]} >
                  <DatePicker required format="MM/DD/YYYY" placeholder="Date of outreach" />
                </Form.Item>

                <Form.Item name="outreachType" label="Type of outreach" rules={[{ required: true,},]} >
                  <Select placeholder="Type of outreach">
                    <Option value="Fixed Site">Fixed Site</Option>
                    <Option value="Mobile Foot">Mobile Foot</Option>
                    <Option value="Mobile Bicyle">Mobile Bicyle</Option>
                    <Option value="Individual/Co-Op Outreach">Individual/Co-Op Outreach</Option>
                  </Select>
                </Form.Item>
              </FormSection>

              <FormSection title="Syringes">
                <Form.Item name="numNeedles" label="Total # of syringes" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="Total # of syringes" min="0" type="number" />
                </Form.Item>

                <Form.Item name="numPeopleReceivedSyringes" label="Total # of people who got syringes" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="Total # of people who got syringes" min="0" type="number" />
                </Form.Item>
              </FormSection>

              <FormSection title="Naloxone">
                <Form.Item name="numNaloxone" label="Total # of Naloxone" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="Total # of Naloxone" min="0" type="number" />
                </Form.Item>

                <Form.Item name="numUsedNaloxone" label="How many people had used Naloxone before?" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="# of people that had used Naloxone before" min="0" type="number" />
                </Form.Item>

                <Form.Item name="numUsedNaloxoneFromPPOP" label="How many people had last used Naloxone from PPOP?" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="# of people who had last used Naloxone from PPOP" min="0" type="number" />
                </Form.Item>

                <Form.Item name="numPeopleLived" label="How many people were okay after using Naloxone?" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="# of people okay after using Naloxone" min="0" type="number" />
                </Form.Item>

                <Form.Item name="numLivedFromPPOP" label="How many people were okay after using Naloxone from PPOP?" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="# of people okay after using Naloxone from PPOP" min="0" type="number" />
                </Form.Item>

                <Form.Item name="numNaloxoneTrainings" label="Total # of people trained to use Naloxone" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="Total # of people trained to use Naloxone" min="0" type="number" />
                </Form.Item>
              </FormSection>

              <FormSection title="Meth pipes">
                <Form.Item name="numMethPipes" label="Total # of Meth Pipes" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="Total # of Meth Pipes" min="0" type="number" />
                </Form.Item>

                <Form.Item name="numPeopleTurnedDownMethPipes" label="How many people asked for a meth pipe and didn’t get one?" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="# of people who asked for a meth pipe and didn't get one" min="0" type="number" />
                </Form.Item>
              </FormSection>

              <FormSection title="Other">
                <Form.Item name="numPeople" label="Total # of people" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="Total # of people" min="0" type="number" />
                </Form.Item>

                <Form.Item name="numWoundCare" label="Total # of Wound Care Kits distributed" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="Total # of Wound Care Kits distributed" min="0" type="number" />
                </Form.Item>

                <Form.Item name="numSnortingKits" label="Total # of Snorting Kits distributed" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="Total # of Snorting Kits distributed" min="0" type="number" />
                </Form.Item>

                <Form.Item name="numPolice" label="Total # of police" rules={[{ required: true,},]} >
                  <InputNumber required placeholder="Total # of police" min="0" type="number" />
                </Form.Item>
              </FormSection>

              <FormSection>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </FormSection>
            </Form>

            {
            }
          </Content>
        </Container>
      </>
    )}

    {!isSignedIn && (
      <SignInScreen>
        <Button type="primary" onClick={signInCTA}>
          Sign In
        </Button>
      </SignInScreen>
    )}

    {showLoadingScreen && (
      <LoadingScreen />
    )}
    </>
  );
}

export default App;
