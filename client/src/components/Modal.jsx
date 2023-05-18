import React from "react";
import { SINGLE_CHARITY } from "../utils/queries";
import { client } from "../utils/client";
//Used class components
export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      charity: {},
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    const { charityId } = this.props;
    client.query({
      query: SINGLE_CHARITY,
      variables: { charityId },
    })
      .then(response => {
        const charity = response.data.charity;
        this.setState({
          showModal: true,
          charity,
        });
      })
      .catch(error => console.error(error));
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { showModal, charity } = this.state;

    return (
      <>
        <button
          className="bg-indigo-100 text-indigo-800 active:bg-indigo-200 font-bold text-sm px-4 rounded-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-150"
          type="button"
          onClick={this.handleOpenModal}
        >
          Explore
        </button>
        {showModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my- mx-auto max-w-md">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">{charity.name}</h3>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      {charity.mission}
                    </p>
                  </div>
                  <div className="flex items-center justify-end p-6 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={this.handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
      </>
    );
  }
}
