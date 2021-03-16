import React, { useState, useEffect } from 'react';
import { Form, Button, Select, DatePicker, InputNumber, Alert } from 'antd';

import { gapi } from "gapi-script";
import Container from './components/container';
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
      range: 'Sheet1', //this is the default spreadsheet name, so unless you've changed it, or are submitting to multiple sheets, you can leave this
      // How the input data should be interpreted.
      valueInputOption: 'USER_ENTERED', //RAW = if no conversion or formatting of submitted data is needed. Otherwise USER_ENTERED
      // How the input data should be inserted.
      insertDataOption: 'INSERT_ROWS', //Choose OVERWRITE OR INSERT_ROWS
    };

    const valueRangeBody = {
      'majorDimension': 'ROWS', //log each entry as a new row (vs column)
      'values': [submitValues] //convert the object's values to an array
    };

    setShowLoadingScreen(true);

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

  const handleClientLoad =()=> { //initialize the Google API
    gapi.load('client:auth2', initClient);
  }

  const updateSignInStatus = (signedIn) => {
    setIsSignedIn(signedIn);
    setShowLoadingScreen(false);
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

  const initClient =()=> { //provide the authentication credentials you set up in the Google developer console
    gapi.client.init({
      'apiKey': process.env.REACT_APP_API_KEY,
      'clientId': process.env.REACT_APP_CLIENT_ID,
      'scope': process.env.REACT_APP_SCOPE,
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(()=> {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus); //add a function called `updateSignInStatus` if you want to do something once a user is logged in with Google
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  useEffect(() => {
    handleClientLoad();
  }, []);

  return (
    <>
    {isSignedIn && (
      <>
        {alert && (
          <Alert message={alert.message} type={alert.type} banner="true" closable="true" showIcon="false" onClose={closeAlert}/>
        )}

        <Container>
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
              <Form.Item name="numNeedles" label="Total # of Syringes" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of Syringes" />
              </Form.Item>

              <Form.Item name="numPeopleReceivedSyringes" label="Total # of People Who Got Syringes" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of People Who Got Syringes" />
              </Form.Item>
            </FormSection>

            <FormSection title="Naloxone">
              <Form.Item name="numNaloxone" label="Total # of Naloxone" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of Naloxone" />
              </Form.Item>

              <Form.Item name="numUsedNaloxone" label="Total # of Used Naloxone" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of Used Naloxone" />
              </Form.Item>

              <Form.Item name="numUsedNaloxoneFromPPOP" label="Total # of Most Recently Used Naloxone That Came from PPOP" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of Most Recently Used Naloxone That Came from PPOP" />
              </Form.Item>

              <Form.Item name="numPeopleLived" label="Total # of People Who Lived" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of People Who Lived" />
              </Form.Item>

              <Form.Item name="numLivedFromPPOP" label="Total # of Times that the Most Recently Used Naloxone that Came from PPOP Resulted in Survival" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of Times that the Most Recently Used Naloxone that Came from PPOP Resulted in Survival" />
              </Form.Item>

              <Form.Item name="numNaloxoneTrainings" label="Total # of People Trained to Use Naloxone" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of People Trained to Use Naloxone" />
              </Form.Item>
            </FormSection>

            <FormSection title="Meth pipes">
              <Form.Item name="numMethPipes" label="Total # of Meth Pipes" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of Meth Pipes" />
              </Form.Item>

              <Form.Item name="numPeopleTurnedDownMethPipes" label="Total # of People Who Were Turned Down for a Meth Pipe" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of People Who Were Turned Down for a Meth Pipe" />
              </Form.Item>
            </FormSection>

            <FormSection title="Other">
              <Form.Item name="numSnortingKits" label="Total # of Snorting Kits Distributed" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of Snorting Kits Distributed" />
              </Form.Item>

              <Form.Item name="numWoundCare" label="Total # of Wound Care Kits Distributed" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of Wound Care Kits Distributed" />
              </Form.Item>

              <Form.Item name="numPeople" label="Total # of People" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of People" />
              </Form.Item>

              <Form.Item name="numPolice" label="Total # of Police" rules={[{ required: true,},]} >
                <InputNumber required placeholder="Total # of Police" />
              </Form.Item>
            </FormSection>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

          <Button onClick={signOutCTA}>Sign out</Button>
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
