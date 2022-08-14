import React from 'react';
import './Quiz.css';

enum Proposition {
    An = "an",
    Auf = "auf",
    Aus = "aus",
    Bei = "bei",
    Fur = "für",
    Gegen = "gegen",
    In = "in",
    Mit = "mit",
    Nach = "nach",
    Uber = "über",
    Um = "um",
    Unter = "unter",
    Von = "von",
    Vor = "vor",
    Zu = "zu",
    Zwischen = "zwischen"
}

enum GrammaticalCase {
    Nominative = "nominative",
    Accusative = "accusative",
    Dative = "dative",
    Genitive = "genitive"
}

type VerbInfo = {
    verb: string;
    proposition: Proposition;
    case: GrammaticalCase;
}

const verbs: VerbInfo[] = [
    {
        verb: "ändern",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "arbeiten",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "erkennen",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "erkranken",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "fehlen",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "forschen",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "gewinnen",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "hindern",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "leiden",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "liegen",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "mangeln",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "mitwirken",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "sich beteiligen",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "sich erfreuen",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "sich orientieren",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "sich rächen",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "schreiben",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "sterben",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "teilhaben",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "teilnehmen",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "zunehmen",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "zweifeln",
        proposition: Proposition.An,
        case: GrammaticalCase.Dative
    },
    {
        verb: "anpassen",
        proposition: Proposition.An,
        case: GrammaticalCase.Accusative
    },
    {
        verb: "appellieren",
        proposition: Proposition.An,
        case: GrammaticalCase.Accusative
    },
    {
        verb: "denken",
        proposition: Proposition.An,
        case: GrammaticalCase.Accusative
    },
    {
        verb: "erinnern",
        proposition: Proposition.An,
        case: GrammaticalCase.Accusative
    },
    {
        verb: "sich gewöhnen",
        proposition: Proposition.An,
        case: GrammaticalCase.Accusative
    },
    {
        verb: "glauben",
        proposition: Proposition.An,
        case: GrammaticalCase.Accusative
    },
    {
        verb: "sich halten",
        proposition: Proposition.An,
        case: GrammaticalCase.Accusative
    },
    {
        verb: "liefern",
        proposition: Proposition.An,
        case: GrammaticalCase.Accusative
    },
    {
        verb: "sich machen",
        proposition: Proposition.An,
        case: GrammaticalCase.Accusative
    },
]

function next_verb(): VerbInfo {
    return verbs[Math.floor(Math.random() * verbs.length)]
}

export interface QuizProps { };

export interface QuizState {
    /** The information about the current verb */
    current_verb: VerbInfo,
    /** How many questions have been correct so far */
    number_correct: number,
    /** How many questions have been asked total */
    total_answered: number,
    selected_proposition: string,
    selected_case: string,
}

export class Quiz extends React.Component<QuizProps, QuizState> {
    state: QuizState = {
        current_verb: next_verb(),
        number_correct: 0,
        total_answered: 0,
        selected_proposition: "",
        selected_case: "",
    }

    checkAnswers(e: React.SyntheticEvent) {
        e.preventDefault();
        console.log(this.state)
        if (this.state.selected_proposition === "" || this.state.selected_case === "") {
            // Missing an answer
            alert("Missing an answer!");
            return;
        }
        console.log(`selected: (${this.state.selected_proposition}, ${this.state.selected_case})`);
        const selected_proposition = Proposition[this.state.selected_proposition as keyof typeof Proposition];
        const selected_case = GrammaticalCase[this.state.selected_case as keyof typeof GrammaticalCase];
        console.log(`selected: (${selected_proposition}, ${selected_case}), correct = (${this.state.current_verb.proposition}, ${this.state.current_verb.case})`);
        if (selected_proposition === this.state.current_verb.proposition && selected_case === this.state.current_verb.case) {
            // Correct
            console.log("correct!");
            this.setState({
                current_verb: next_verb(),
                number_correct: this.state.number_correct + 1,
                total_answered: this.state.total_answered + 1,
                selected_proposition: "",
                selected_case: ""
            })
        } else {
            // Incorrect
            console.log("Incorrect!");
            this.setState({
                current_verb: next_verb(),
                number_correct: this.state.number_correct,
                total_answered: this.state.total_answered + 1,
                selected_proposition: "",
                selected_case: ""
            })
        }
        console.log("new state");
        console.log(this.state);
    }

    onPropositionSelected(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ selected_proposition: e.target.value });
    }

    onCaseSelected(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ selected_case: e.target.value });
    }

    render() {
        return (
            <div className="QuizContainer">
                <h1>Verben mit Präpositionen Quiz</h1>
                <form className="QuizForm" onSubmit={(event) => this.checkAnswers(event)}>
                    <div className="Container">
                        <p className="VerbContainer">{this.state.current_verb.verb}</p>
                        <div className="ResultsContainer">
                            <p>Number Correct: {this.state.number_correct}</p>
                            <p>Total Answered: {this.state.total_answered}</p>
                            <p>Percentage: {Math.round(100.0 * (this.state.number_correct / Math.max(this.state.total_answered, 1)))}%</p>
                        </div>
                    </div>
                    <div className="AnswersContainer">
                        <div className="PropositionsContainer">
                            <p>Präposition:</p>
                            <>
                                {Object.keys(Proposition).map(key => {
                                    let value = Proposition[key as keyof typeof Proposition]
                                    return (
                                        <div key={`${key}-div`}>
                                            <input
                                                type="radio"
                                                id={key}
                                                key={key}
                                                name="proposition"
                                                value={key}
                                                checked={this.state.selected_proposition === key}
                                                onChange={(event) => this.onPropositionSelected(event)} />
                                            <label key={`${key}-label`} htmlFor={key}>{value}</label>
                                        </div>
                                    )
                                })}
                            </>
                        </div>
                        <div className="CasesContainer">
                            <p>Kasus:</p>
                            <>
                                {Object.keys(GrammaticalCase).map(key => {
                                    let value = GrammaticalCase[key as keyof typeof GrammaticalCase]
                                    return (
                                        <div key={`${key}-div`}>
                                            <input
                                                type="radio"
                                                id={key}
                                                key={key}
                                                name="case"
                                                value={key}
                                                checked={this.state.selected_case === key}
                                                onChange={(event) => this.onCaseSelected(event)} />
                                            <label key={`${key}-label`} htmlFor={key}>{value}</label>
                                        </div>
                                    )
                                })}
                            </>
                        </div>
                    </div>
                    <div className="ButtonContainer">
                        <button type="submit" className="check-btn">
                            Check
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}