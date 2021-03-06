import csvParse from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '@cars:irepos/ICategoriesRepository';

interface IImportedCategory {
  name: string;
  description: string;
}

@injectable()
export default class ImportCategory {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategory(file: Express.Multer.File): Promise<IImportedCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportedCategory[] = [];
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, description] = line;

          categories.push({ name, description });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategory(file);

    categories.map(async category => {
      const { name, description } = category;

      const categoryAlreadyExists = this.categoriesRepository.findByName(name);

      if (!categoryAlreadyExists) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}
