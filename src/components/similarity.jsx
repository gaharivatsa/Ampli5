import React, { useState } from 'react';

const Similarity = () => {
    const [jd, setJD] = useState(null);
    const [resume, setResume] = useState(null);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
    }

    const handleJDChange = (e) => {
        setJD(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('jd', jd);

        try {
            const response = await fetch("https://gen-back-gaharivatsagmailcoms-projects.vercel.app/compare", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to fetch");
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-black p-8">
            {/* Page Heading */}
            <h2 className="text-3xl lg:text-4xl font-extrabold text-orange-500 text-center mb-6">
                Resume and JD Similarity Tool
            </h2>

            {/* Tool Description */}
            <p className="text-lg lg:text-xl text-gray-300 text-center mb-8 mx-auto max-w-4xl">
                This tool helps you compare a resume with a job description (JD) to evaluate how closely they match. 
                Upload a resume and a JD, and the tool will analyze the content to highlight strengths, areas for improvement, 
                and provide actionable suggestions for better alignment with the job requirements.
            </p>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Form */}
                <div className="lg:w-1/2 flex justify-center items-center">
                    <form onSubmit={handleSubmit} className="bg-orange-600 p-10 rounded-3xl space-y-6 w-full lg:w-3/4">
                        <div className="mb-4">
                            <label className="block text-white text-lg lg:text-xl font-medium mb-2" htmlFor="resume">
                                Upload Resume (PDF):
                            </label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleResumeChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                                required
                            />
                            <label className="block text-white text-lg lg:text-xl font-medium mb-2 mt-4" htmlFor="jd">
                                Upload JD (PDF):
                            </label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleJDChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-black text-orange-500 font-semibold text-lg rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
                        >
                            Compare Resume and JD
                        </button>
                    </form>
                </div>

                {/* Right Column: Results */}
                <div className="lg:w-1/2 flex flex-col gap-6">
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    {result && (
                        <>
                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl lg:text-2xl font-bold text-orange-500 mb-4">Similarity Score: {result.similarity_score}</h3>
                            </div>

                            {result.content.strengths && (
                                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                    <h4 className="text-lg lg:text-xl font-semibold text-orange-500 mb-3">Strengths:</h4>
                                    <ul className="list-disc pl-8 space-y-2 text-white">
                                        {result.content.strengths.map((strength, index) => (
                                            <li key={index} className="text-sm lg:text-lg">{strength}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {result.content.areas_for_improvement && (
                                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                    <h4 className="text-lg lg:text-xl font-semibold text-orange-500 mb-3">Areas for Improvement:</h4>
                                    <ul className="list-disc pl-8 space-y-2 text-white">
                                        {result.content.areas_for_improvement.map((area, index) => (
                                            <li key={index} className="text-sm lg:text-lg">{area}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {result.content.improvement_suggestions && (
                                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                    <h4 className="text-lg lg:text-xl font-semibold text-orange-500 mb-3">Improvement Suggestions:</h4>
                                    <ul className="list-disc pl-8 space-y-2 text-white">
                                        {result.content.improvement_suggestions.map((suggestion, index) => (
                                            <li key={index} className="text-sm lg:text-lg">{suggestion}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Similarity;
