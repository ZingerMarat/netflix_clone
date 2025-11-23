import { useState } from "react"
import { toast } from "react-hot-toast"
import { generateAIPicks } from "../../lib/AIModel.js"
import RecommendedMovies from "../components/RecommendedMovies.jsx"
import { useRecommendStore } from "../store/recommendStore.js"

const steps = [
  {
    name: "Genre Selection",
    question: "What is your preferred genre?",
    options: ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"],
  },
  {
    name: "Mood Selection",
    question: "What mood are you in?",
    options: ["Excited", "Relaxed", "Thoughtful", "Scared", "Romantic", "Adventurous"],
  },
  {
    name: "Era Selection",
    question: "Which era do you prefer?",
    options: ["Classic (before 1980)", "80s", "90s", "2000s", "2010s", "Recent (2020-present)"],
  },
  {
    name: "Country Preference",
    question: "Do you have a preferred country of origin?",
    options: ["USA", "UK", "France", "India", "Korea", "Other"],
  },
  {
    name: "Length Preference",
    question: "What is your preferred movie length?",
    options: ["Short (<90 mins)", "Medium (90-120 mins)", "Long (>120 mins)"],
  },
]

const initialState = steps.reduce((acc, step) => {
  acc[step.name] = ""
  return acc
}, {})

const AIPicks = () => {
  const [answers, setAnswers] = useState(initialState)
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const { storedRecommendations, setStoredRecommendations, clearStoredRecommendations } =
    useRecommendStore()

  const handleOptionSelect = (option) => {
    const stepName = steps[currentStep].name
    setAnswers({ ...answers, [stepName]: option })
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      console.log("Final Answers:", answers)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGenerateRecommendations = async () => {
    if (!answers) {
      toast.error("Please answer all questions before generating recommendations.")
    }

    setLoading(true)

    const userPrompt = `
                        You are a movie recommendation engine.

                        Based on these user preferences, recommend several movies that match as well as possible.

                        Preferences:
                        - Genre: ${answers["Genre Selection"]}
                        - Mood: ${answers["Mood Selection"]}
                        - Era: ${answers["Era Selection"]}
                        - Country: ${answers["Country Preference"]}
                        - Length: ${answers["Length Preference"]}

                        Only consider real, existing movies.
                        Each item in the list should be a single movie title (no year, no explanation).
                        `

    const results = await generateAIPicks(userPrompt)
    setLoading(false)

    if (Array.isArray(results) && results.length > 0) {
      setStoredRecommendations(results)
    } else {
      toast.error("Failed to generate recommendations. Please try again.")
    }
  }

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-5"
      style={{
        backgroundImage:
          "linear-gradient(rgb(0,0,0,0.5), rgba(0,0,0,0.5)), url(/background_banner.jpg)",
      }}
    >
      <div className="relative w-full max-w-md mx-auto rounded-2xl bg-[#181818]/90 shadow-2xl border border-[#333] px-8 py-10 flex flex-col items-center min-h-[480px]">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-white tracking-tight drop-shadow-lg">
          AI Movie Recommendations
        </h2>

        {storedRecommendations.length === 0 ? (
          <>
            <div className="w-full flex items-center mb-8">
              <div className="h-2 flex-1 bg-[#232323] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#e50914] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>

              <span className="ml-4 text-white text-sm font-semibold">
                {currentStep + 1} / {steps.length}
              </span>
            </div>

            <div className="w-full flex-1 flex flex-col">
              <div className="flex-1 mb-6">
                <h3 className="text-lg font-semibold text-white text-center my-3">
                  {steps[currentStep].question}
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {steps[currentStep].options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full py-3 rounded-xl border-2 border-[#333] text-white font-semibold transition duration-300 
                  ${
                    answers[steps[currentStep].name] == option
                      ? "bg-[#e50914]"
                      : "bg-[#232323] hover:bg-[#e50914]"
                  }`}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    className={`py-2 px-4 rounded-lg border-2 border-[#333] bg-[#232323] text-white font-semibold hover:bg-[#232323]/50 transition duration-300 ${
                      currentStep == 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handlePrevStep}
                    disabled={currentStep == 0}
                  >
                    Back
                  </button>
                  <button
                    className={`py-2 px-4 rounded-lg border-2 border-[#333] text-white font-semibold transition duration-300
                                ${
                                  answers[steps[currentStep].name]
                                    ? "bg-[#e50914] hover:bg-[#e50914]/50"
                                    : "bg-[#232323] opacity-50 cursor-not-allowed"
                                }
                            `}
                    onClick={
                      currentStep === steps.length - 1
                        ? handleGenerateRecommendations
                        : handleNextStep
                    }
                    disabled={!answers[steps[currentStep].name] || loading}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                    ) : currentStep === steps.length - 1 ? (
                      "Generate"
                    ) : (
                      "Next"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-white text-center mb-6">
              Your Movie Recommendations are Ready!
            </h3>
            <p className="text-white text-center mb-6">
              You can find your personalized movie recommendations below based on your preferences
              or regenerate new ones.
            </p>

            <button
              className="mt-auto py-2 px-4 rounded-lg border-2 border-[#333] bg-[#e50914] text-white font-semibold hover:bg-[#e50914]/50 transition duration-300"
              onClick={() => {
                setAnswers(initialState)
                setCurrentStep(0)
                clearStoredRecommendations()
              }}
            >
              Regenerate Recommendations
            </button>
          </>
        )}
      </div>

      {storedRecommendations.length > 0 && (
        <RecommendedMovies movieTitles={storedRecommendations} />
      )}
    </div>
  )
}

export default AIPicks
