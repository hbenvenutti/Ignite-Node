interface IStoragesProvider {
  save(file: string, directory: string): Promise<string>;
  delete(file: string, directory: string): Promise<void>;
}

export default IStoragesProvider;
