// import Web3ReactWallet from "./Wallet/Web3ReactWallet";

import Web3ReactWallet from "./Web3ReactWallet";

const WalletModal = ({ setIsModalOpen }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto ">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg bg-gradient-to-r from-blue-600 to-blue-700 w-64">
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <Web3ReactWallet />
            </div>
            <div className="bg-blue-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 bg-gradient-to-r from-blue-600 to-blue-700">
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md  bg-blue-900  px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
