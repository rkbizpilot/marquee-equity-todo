import { Button } from "../Button";

export default function Modal({
  showModal,
  onClose,
  newItem,
  setNewItem,
  handleSubmit
}: {
  showModal: boolean;
  onClose: () => void;
  newItem: string;
  setNewItem: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}) {
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={onClose}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex w-full">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left w-full">
                    <h4 className="text-lg font-medium text-gray-800">
                      Add new item
                    </h4>
                    <div className="mt-2">
                      <input
                        id="value"
                        name="value"
                        type="text"
                        value={newItem}
                        className={` w-full block  appearance-none rounded-md border border-gray-300
                 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                        onChange={(e) => setNewItem(e.target.value)}
                      />
                    </div>
                    <div className="items-center gap-2 mt-3 sm:flex justify-end">
                      <Button
                        onClick={() => handleSubmit()}
                        disabled={newItem.length < 3}
                      >
                        Add
                      </Button>
                      <Button onClick={onClose} color="secondary">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
