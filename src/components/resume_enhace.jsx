import React, { useState } from 'react';

const ResumeEnhance = () => {
    const [resumeFile, setResumeFile] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setResumeFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append('file', resumeFile);

        try {
            const response = await fetch('http://127.0.0.1:5000/resume_enhance', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to fetch the response');
            }

            const data = await response.json();
            setResult(data);
            console.log(data);  // Log the received data to verify its structure
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-8 min-w-full min-h-screen mx-auto bg-black text-white shadow-xl ">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-orange-500 flex justify-center mb-6 text-center py-4 rounded-lg">
                Enhance Your Resume
            </h2>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column */}
                <div className="lg:w-1/2 lg:min-h-[70vh] flex justify-center items-center p-6 rounded-lg">
                    <form onSubmit={handleSubmit} className="w-full lg:w-3/4 bg-orange-600 p-10 rounded-3xl space-y-6 shadow-lg">
                        <div className="mb-4">
                            <label className="block text-lg lg:text-xl font-medium mb-2" htmlFor="resume">
                                Upload Resume (PDF):
                            </label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-black text-orange-500 font-semibold text-lg rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
                        >
                            Enhance Resume
                        </button>
                    </form>
                </div>

                {/* Right Column */}
                <div className="lg:w-1/2 flex flex-col gap-6">
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    {result && (
                        <div className="flex flex-col gap-6">
                            {result?.strengths?.length > 0 && (
                                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                    <h4 className="text-xl lg:text-2xl font-semibold text-orange-500 mb-3">Strengths:</h4>
                                    <ul className="list-disc pl-8 space-y-2">
                                        {result.strengths.map((strength, index) => (
                                            <li key={index} className="text-sm lg:text-lg text-white">{strength.description}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {result?.areas_for_improvement?.length > 0 && (
                                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                    <h4 className="text-xl lg:text-2xl font-semibold text-orange-500 mb-3">Areas for Improvement:</h4>
                                    <ul className="list-disc pl-8 space-y-2">
                                        {result.areas_for_improvement.map((area, index) => (
                                            <li key={index} className="text-sm lg:text-lg text-white">
                                                <div className="font-semibold">{area.description}</div>
                                                <ul className="list-disc pl-6 space-y-1">
                                                    {area.suggestions.map((suggestion, suggestionIndex) => (
                                                        <li key={suggestionIndex} className="text-sm lg:text-base">{suggestion}</li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {result?.actionable_suggestions?.length > 0 && (
                                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                    <h4 className="text-xl lg:text-2xl font-semibold text-orange-500 mb-3">Actionable Suggestions:</h4>
                                    <ul className="list-disc pl-8 space-y-2">
                                        {result.actionable_suggestions.map((suggestion, index) => (
                                            <li key={index} className="text-sm lg:text-lg text-white">{suggestion}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeEnhance;
