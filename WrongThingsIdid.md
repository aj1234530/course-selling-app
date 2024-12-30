While mapping passing a react compone passing a props, but react remember the latest prop
 <h3 className="text-xl font-semibold text-gray-800 flex-1">
                      {el.title}
                    </h3>
                    <div className="flex space-x-2">
                      {/* <UploadVideo
                      // problem is here , it will pass the last state value reme
                        folderId={el.id}
                        isUploadVideoModelOpen={isUploadVideoModelOpen}
                        setIsUploadVideoModelOpen={setIsUploadVideoModelOpen}
                      /> */}
                      <button
                        type="button"
                        id={el.id}
                        onClick={handleVideoUpload}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                      >
                        Add Video
                      </button>