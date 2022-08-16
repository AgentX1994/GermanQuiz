import React from 'react';
import './Quiz.css';

import RawVerbs from './verbs.json'

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
    verb_form: string;
    verb: string;
    proposition: Proposition;
    case: GrammaticalCase;
    examples: string[];
}

function getEnumKeyByEnumValue(myEnum: any, enumValue: number | string): string {
    let keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : '';
}

function parse_verbs(): VerbInfo[] {
    let ret = []
    for (let raw_verb of RawVerbs) {
        if (
            !raw_verb.hasOwnProperty('verb_form')
            || !raw_verb.hasOwnProperty('verb')
            || !raw_verb.hasOwnProperty('proposition')
            || !raw_verb.hasOwnProperty('case')
            || !raw_verb.hasOwnProperty('examples')
        ) {
            console.log(`bad verb: ${raw_verb}`);
            continue;
        }
        let prop_key = getEnumKeyByEnumValue(Proposition, raw_verb.proposition);
        let case_key = getEnumKeyByEnumValue(GrammaticalCase, raw_verb.case);
        ret.push(
            {
                verb_form: raw_verb.verb_form,
                verb: raw_verb.verb,
                proposition: Proposition[prop_key as keyof typeof Proposition],
                case: GrammaticalCase[case_key as keyof typeof GrammaticalCase],
                examples: raw_verb.examples,
            }
        )
    }
    return ret;
}

const verbs = parse_verbs()

function next_verb(): VerbInfo {
    return verbs[Math.floor(Math.random() * verbs.length)];
}

export interface QuizProps { };

export interface QuizState {
    /** The information about the current verb */
    current_verb: VerbInfo,
    /** How many questions have been correct so far */
    number_correct: number,
    /** How many questions have been asked total */
    total_answered: number,
    /** The currently selected proposition */
    selected_proposition: string,
    /** The currently selected case */
    selected_case: string,
    /** The last verb that was answered */
    last_verb: VerbInfo | null,
    /** The last proposition that was selected */
    last_proposition: string,
    /** The last case that was selected */
    last_case: string,
}

export class Quiz extends React.Component<QuizProps, QuizState> {
    state: QuizState = {
        current_verb: next_verb(),
        number_correct: 0,
        total_answered: 0,
        selected_proposition: "",
        selected_case: "",
        last_verb: null,
        last_proposition: "",
        last_case: "",
    };

    checkAnswers(e: React.SyntheticEvent) {
        e.preventDefault();
        if (this.state.selected_proposition === "" || this.state.selected_case === "") {
            // Missing an answer
            alert("Missing an answer!");
            return;
        }
        const last_verb = this.state.current_verb
        const selected_proposition = Proposition[this.state.selected_proposition as keyof typeof Proposition];
        const selected_case = GrammaticalCase[this.state.selected_case as keyof typeof GrammaticalCase];
        const last_proposition = selected_proposition
        const last_case = selected_case
        if (selected_proposition === this.state.current_verb.proposition && selected_case === this.state.current_verb.case) {
            // Correct
            this.setState({
                current_verb: next_verb(),
                number_correct: this.state.number_correct + 1,
                total_answered: this.state.total_answered + 1,
                selected_proposition: "",
                selected_case: "",
                last_verb: last_verb,
                last_proposition: last_proposition,
                last_case: last_case,
            })
        } else {
            // Incorrect
            this.setState({
                current_verb: next_verb(),
                number_correct: this.state.number_correct,
                total_answered: this.state.total_answered + 1,
                selected_proposition: "",
                selected_case: "",
                last_verb: last_verb,
                last_proposition: last_proposition,
                last_case: last_case,
            })
        }
    }

    onPropositionSelected(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ selected_proposition: e.target.value });
    }

    onCaseSelected(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ selected_case: e.target.value });
    }

    render() {
        console.debug({current: this.state.current_verb, last: this.state.last_verb})
        return (
            <div className="QuizContainer">
                <h1>Verben mit Präpositionen Quiz</h1>
                <form className="QuizForm" onSubmit={(event) => this.checkAnswers(event)}>
                    <div className="Container">
                        <p className="VerbContainer">{this.state.current_verb.verb}</p>
                        <div className="ResultsContainer">
                            <p>Anzahl korrekt: {this.state.number_correct}</p>
                            <p>Insgesamt beantwortet: {this.state.total_answered}</p>
                            <p>Prozentsatz: {Math.round(100.0 * (this.state.number_correct / Math.max(this.state.total_answered, 1)))}%</p>
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
                            Prüfen
                        </button>
                    </div>
                </form>
                <div className="LastVerbContainer">
                    <h2>
                        Letztes Verb:
                    </h2>
                    <p className="LastVerbDisplay">
                        {
                            (this.state.last_verb !== null) ? this.state.last_verb.verb_form : "None Yet"
                        }
                    </p>
                    <h2>
                        Beispielsätze:
                    </h2>
                    <div className="ExampleContainer">
                        <>
                            {
                                (this.state.last_verb !== null) ? this.state.last_verb.examples.map(example => {
                                    return (
                                        <p>
                                            {example}
                                        </p>
                                    )
                                }) : ""
                            }
                        </>
                    </div>
                    <div className="AnswerContainer">
                        <p>
                            {
                                (this.state.last_verb !== null)
                                ?
                                (
                                    (this.state.last_proposition !== this.state.last_verb.proposition || this.state.last_case !== this.state.last_verb.case)
                                    ?
                                    `Sie haben "${this.state.last_proposition} + ${this.state.last_case}" ausgewählt, aber die richtige Antwort war "${this.state.last_verb?.proposition} + ${this.state.last_verb?.case}"`
                                    :
                                    ''
                                )
                                : ""
                            }
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}