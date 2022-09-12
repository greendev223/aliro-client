import languages from '../data/selectInputOptions/languageList.json';
let countriesAndRegions = require('../data/selectInputOptions/countriesAndRegions.json');

const makeOptions = (values: Array<Object>, property: string) => {
    let options = values.map(
        (item: any, ind) => ({ code: String(ind), label: item[property] })
    )
    // add default empty option
    return [{ code: "", label: "" }, ...options]
}

const createOptionsFromList = (labels: Array<string | Number>) => {
    let options = labels.map(
        (label: string | Number, ind: number) => ({ code: ind, label: String(label) })
    )
    return [{ code: -1, label: "" }, ...options]
}

// COUNTRIES & REGIONS
export let countriesOptions = makeOptions(countriesAndRegions, 'countryName')
// just Canada & Australia
export let countriesOptionsCanAus = countriesOptions.filter(entry => ["", 'Canada', 'Australia'].includes(entry.label));

interface Country {
    countryName: string
    code: string
    regions: Array<Object>
}

export const getRegionsOptions = (country: string) => {
    // return array of regions corresponding to country. If country === '' returns empty array
    if (!country)
        return []
    let regions = countriesAndRegions.filter((values: Country) => values.countryName === country)[0].regions
    regions = [{ code: "", label: "" }, ...regions]
    return regions
}

// AGE
const ages = new Array(112).fill(0).map((_, i) => i + 1);
export let ageOptions = createOptionsFromList(ages)


// FAMILY
export let numberFamilyMembersOptions = createOptionsFromList([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])

// LANGUAGE
export let optionsLang = makeOptions(Object.values(languages), 'name')
export let optionsGrade = createOptionsFromList([1, 2, 3, 4, 5, 6, 7, 8, 9])
export let optionsLanguageTest = createOptionsFromList(['IELTS', 'TEF', 'own assessment'])


// INDUSTRIES OPTIONS
let fullNOC = require('../data/selectInputOptions/professions.json')
interface Subindustry {
    label: string
    professions: Array<Object>
}
interface Industry {
    label: string
    subindustries: Array<Subindustry>
}

export let industryOptions = makeOptions(fullNOC, 'label')

export const getSubindustryOptions = (industry: string) => {
    // return array of subindustries corresponding to industry. If industry === '' returns empty array
    if (!industry)
        return []
    let subindustries = fullNOC.filter((values: Industry) => values.label === industry)[0].subindustries
    return makeOptions(subindustries, 'label')
}

export const getProfessionsOptions = (industry: string, subindustry: string) => {
    // return array of professions corresponding to industry. If industry === '' returns empty array
    if (!industry || !subindustry)
        return []
    let subindustries = fullNOC.filter((values: Industry) => values.label === industry)[0].subindustries
    let professions = subindustries.filter((values: Subindustry) => values.label === subindustry)[0].professions
    return makeOptions(professions, 'label')
}


// DUTIES OPTIONS
export const getDuties = (industry: string, subindustry: string) => {
    if (!industry || !subindustry)
        return []
    let subindustries = fullNOC.filter((values: Industry) => values.label === industry)[0].subindustries
    let _subindustry = subindustries.filter((values: Subindustry) => values.label === subindustry)[0]
    if (!_subindustry)
        return []
    let professions = _subindustry.professions
    let duties: Array<string> = []
    for (let profession of professions)
        duties = duties.concat(profession.duties)
    return createOptionsFromList(duties)
}

export const getDutiesOfProfession = (industry: string, subindustry: string, profession: string) => {
    if (!industry || !subindustry || !profession)
        return []
    let subindustries = fullNOC.filter((values: Industry) => values.label === industry)[0].subindustries
    // get first profession - all profesisons have same skill level
    let professions = subindustries.filter((values: Subindustry) => values.label === subindustry)[0].professions
    return professions.filter((values: Profession) => values.label === profession)[0].duties
}

export const getProfessions = (industry: string, subindustry: string) => {
    if (!industry || !subindustry)
        return []
    let subindustries = fullNOC.filter((values: Industry) => values.label === industry)[0].subindustries
    // get first profession - all profesisons have same skill level
    let _subindustry = subindustries.filter((values: Subindustry) => values.label === subindustry)[0]
    if (!_subindustry)
        return []
    return _subindustry.professions
}

export const professionPoints = (selectedDuties: Array<string>, dutiesOfProfession: Array<string>) => {
    // returns the number of duties in selected dutiesOfProfession that are included in selectedDuties
    let numberIncluded = 0;
    for (let duty of dutiesOfProfession) {
        if (selectedDuties.includes(duty)) {
            numberIncluded += 1
        }
    }
    return numberIncluded
}


interface ProfessionScores {
    profession: string
    score: number
}

export const getBestFitProfessions = (selectedDuties: Array<string>, professions: Array<Profession>) => {
    if (selectedDuties.includes("")) {
        return []
    }
    let professionScores: Array<ProfessionScores> = [];
    for (let profession of professions) {
        const professionDuties = profession.duties;
        let nextScore = professionPoints(selectedDuties, professionDuties)
        professionScores.push({ 'profession': profession.label, 'score': nextScore })
    }
    const maxScore = Math.max(...(professionScores.map(entry => entry.score)))
    const bestFitProfessions = professionScores.filter(entry => entry.score === maxScore)
    return makeOptions(bestFitProfessions, 'profession')
}


export interface Profession {
    label: string
    NOC: number
    duties: Array<string>
    skill_level: string
    titles: Array<string>
}

// SKILL LEVEL
export const getSkillLevel = (industry: string, subindustry: string, profession: string) => {
    if (!industry || !subindustry || !profession)
        return ''
    let subindustries = fullNOC.filter((values: Industry) => values.label === industry)[0].subindustries
    // get first profession - all professions have same skill level
    let _subindustry = subindustries.filter((values: Subindustry) => values.label === subindustry)[0]
    if (!_subindustry)
        return ''
    let professions = _subindustry.professions

    let _profession = professions.filter((values: Profession) => values.label === profession)[0]
    if (!_profession)
        return ''
    return _profession.skill_level
}

