export class Helper {

  static letters: Array<string> = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  static convert_index_to_letter(index: number): string {
    if ((index < 0) || (index > Helper.letters.length)){return '';}

    return Helper.letters[ index ];
  }

}
