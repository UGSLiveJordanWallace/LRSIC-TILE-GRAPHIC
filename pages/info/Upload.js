export default function UploadPage() {
    return (
        <div className="flex flex-col justify-center w-full">
            <h1 className="text-bold text-center text-5xl m-5">Upload</h1>
            <div className="block p-8 w-full">
                <p className="inline-block w-full text-xl text-center">
					You can upload excel files in case you have to add tiles in bulk.
					Before you can, however, there are requirements your (.xlsx) file must follow.
				</p>
                <p className="inline-block w-full text-center mt-10">
					Spreadsheet columns
				</p>
				<div className="flex flex-row border border-black text-2xl text-center w-full m-auto overflow-x-auto mobile:w-1/2">
					<h3 className="inline-block flex-auto p-3">block</h3>					
					<h3 className="inline-block flex-auto p-3">section</h3>					
					<h3 className="inline-block flex-auto p-3">row</h3>					
					<h3 className="inline-block flex-auto p-3">col</h3>					
					<h3 className="inline-block flex-auto p-3">name</h3>					
					<h3 className="inline-block flex-auto p-3">description</h3>					
				</div>
                <p className="inline-block w-full text-xl text-center mt-10">
					Your (.xlsx) file rows must follow this exact format.
				</p>
                <p className="inline-block w-full text-xl text-center mt-10">
					Navigate to the /control-panel/upload url. Click the <strong className="text-bold text-2xl">Click Here To Upload Compatible File</strong> button 
					in the center of the page.
				</p>
                <p className="inline-block w-full text-xl text-center mt-10">
					File Upload Button
				</p>
				<div className="border p-10 text-center border-black w-full m-auto bg-stone-200 mobile:w-1/2 overflow-x-auto">
                    <label
                        className="p-4 bg-white rounded-lg text-nowrap shadow-lg hover:bg-stone-300 transition duration-500 mobile:text-2xl"
                    >
                        Click Here To Upload Compatible File
                    </label>
				</div>
                <p className="inline-block w-full text-xl text-center mt-10">
					Once uploaded, you can preview the changes you have made within th blocks you defined in the original (.xlsx).
				</p>
            </div>
        </div>
    );
}
