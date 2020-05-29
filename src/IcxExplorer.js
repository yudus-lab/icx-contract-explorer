import React from "react";
import { Auth } from "./Auth.js";
import { Utility } from "./Utility.js";
import { ContractApi, ApiItem } from "./ContractApi.js";
import "./css/IcxExplorer.css";

const ExplorerContext = React.createContext();
Auth.contextType = ExplorerContext;
Utility.contextType = ExplorerContext;
ApiItem.contextType = ExplorerContext;
ContractApi.contextType = ExplorerContext;

const TITLE = "ICX Contract Explorer";
const SUB_TITLE = "For ICON contract development • © 2020 duyyudus";

const TESTNET_ENDPOINT = "https://bicon.tracker.solidwallet.io/api/v3";
const MAINNET_ENDPOINT = "https://ctz.tracker.solidwallet.io/api/v3";
const DEFAULT_OWNER = "hxfafe76ab475a06b184587695327e72c04b4566a4";
const DEFAULT_PKEY = "";
const DEFAULT_CONTRACT = "cxa6ba8f0730ad952b5898ac3e5e90a17e20574eff";

function Header(props) {
  return (
    <div className="container-fluid" id="IcxExplorer-header">
      <div className="row">
        <div className="col">
          <header id="IcxExplorer-title">{TITLE}</header>
        </div>
        <div className="col" id="IcxExplorer-endpoint">
          <div className="row">
            <div className="col-auto">
              <span className="inline-span">Endpoint</span>
            </div>

            <div className="col">
              <input
                type="text"
                className="form-control"
                id="endpoint-input"
                value={props.endpoint}
                onChange={(e) => props.handleEndpointChange(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <div className="dropdown">
                <button
                  className="btn btn-primary btn-sm dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Choose endpoint
                </button>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => props.handleEndpointChange(TESTNET_ENDPOINT)}
                  >
                    Testnet
                  </a>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => props.handleEndpointChange(MAINNET_ENDPOINT)}
                  >
                    Mainnet
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class IcxExplorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: TESTNET_ENDPOINT,
      owner: DEFAULT_OWNER,
      pkey: "",
      contract: DEFAULT_CONTRACT,
    };
  }

  updateExplorerState = (data) => {
    this.setState(data);
  };

  handleEndpointChange = (newEndpoint) => {
    this.setState({ endpoint: newEndpoint });
  };

  render() {
    return (
      <div className="container-fluid IcxExplorer">
        <Header
          endpoint={this.state.endpoint}
          handleEndpointChange={this.handleEndpointChange}
        />

        <ExplorerContext.Provider
          value={{
            explorerState: {
              endpoint: this.state.endpoint,
              owner: this.state.owner,
              pkey: this.state.pkey,
              contract: this.state.contract,
            },
            updateExplorerState: this.updateExplorerState,
          }}
        >
          <div className="container-fluid" id="IcxExplorer-body">
            <br />
            <div className="row">
              <div className="col">
                <Auth
                  title="Authentication"
                  endpoint={TESTNET_ENDPOINT}
                  owner={DEFAULT_OWNER}
                  pkey={DEFAULT_PKEY}
                  contract={DEFAULT_CONTRACT}
                />
              </div>
              <div className="col">
                <Utility title="Utilities" />
              </div>
            </div>
            <br />
            <ContractApi title="Contract APIs" />
            <br />
          </div>
        </ExplorerContext.Provider>
      </div>
    );
  }
}

export default IcxExplorer;