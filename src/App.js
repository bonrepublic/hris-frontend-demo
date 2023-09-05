import axios from 'axios';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { JsonView, darkStyles } from 'react-json-view-lite';

import urls from './urls';

import { connectHris } from './utils';

import './App.css';

function Integration({ integration, showDataModal, removeIntegration }) {
  const { data } = integration
  return (
    <div className='integration'>
      <p><b>integration id:</b> {integration.id}</p>
      <p><b>company_name:</b> {data.company_name}</p>
      <p><b>status:</b> {data.status}</p>
      <p><b>last_sync:</b> {data.last_sync}</p>
      <p><b>tool:</b> {data.tool}</p>
      <button onClick={() => { showDataModal(integration.id, false) }}>
        Get all Employee data
      </button>
      <button onClick={() => { showDataModal(integration.id, true) }}>
        Get latest Employee data
      </button>
      <button onClick={() => { removeIntegration(integration.id) }}>
        Delete integration
      </button>
    </div>
  )
}

function App() {
  const [integrations, setIntegrations] = useState([]);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [employeeData, setEmployeeData] = React.useState('');

  const showDataModal = (integration_id, onlyLatest) => {
    axios
      .get(urls.integrations.getEmployeeData(integration_id, onlyLatest))
      .then(response => {
        setEmployeeData(response.data);
        setModalIsOpen(true);
      })
  }

  const updateIntegrations = () => {
    axios
      .get(urls.integrations.list)
      .then(response => setIntegrations(response.data))
  }

  useEffect(updateIntegrations, []);

  function addIntegration(integrationTool) {
    connectHris(integrationTool)
      .then(() => updateIntegrations())
      .catch(e => console.log(e)) // You have to handle form close via catching "User canceled flow" exception
  }

  const removeIntegration = integration_id => {
    axios.delete(urls.integrations.removeIntegration(integration_id)).then(() => updateIntegrations())
  }

  return (
    <>
      <div className="App">
        <button onClick={() => addIntegration('personio')}>
          add Personio
        </button>
        <br />
        <button onClick={() => addIntegration('googleworkspace')}>
          add Google Workspace
        </button>
        <br />
        {
          integrations.map(integration => <Integration integration={integration} showDataModal={showDataModal} removeIntegration={removeIntegration} />)
        }
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
          setEmployeeData({});
        }}
      >
        <JsonView data={employeeData} shouldInitiallyExpand={(level) => true} style={darkStyles} />
      </Modal>
    </>
  );
}

export default App;
