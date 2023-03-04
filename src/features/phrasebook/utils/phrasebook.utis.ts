import { IPhraseCategory } from '@/features/phrasebook/intefaces'

/**
 * Get phrase category name
 *
 * @param {IPhraseCategory} category
 * @param {string} lang
 */
const getPhraseCategoryName = (
  category: IPhraseCategory,
  lang: string
): string => {
  let categoryName = ''
  switch (lang) {
    case 'vi':
      categoryName = category.name?.vi ? category.name.vi : category.name.en
      break
    case 'id':
      categoryName = category.name?.id ? category.name.id : category.name.en
      break
    default:
      categoryName = category.name.en
  }
  return categoryName
}

export const PhrasebookUtils = {
  getPhraseCategoryName,
}
