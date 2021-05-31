export interface Question {
    _id?: string,
    title: string,
    body?: string,
    image?: string,
    topics_ids?: string[],
    tag_ids?: string[],
    answers_ids?: string[],
    action_ids?: string[]
    perfect_answer_id?: string
}