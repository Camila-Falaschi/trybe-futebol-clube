export interface IFindAndCountAll {
  count: number, 
  rows: IRows[]
}

interface IRows {
  dataValues: ITeam ;
  _previousDataValues: ITeam;
  uniqno: number;
  _changed: number;
  _options: {
    isNewRecord: boolean,
    _schema: null,
    _schemaDelimiter: '',
    raw: true,
    attributes: []
  };
  isNewRecord: false;
};

interface ITeam {
  id: number;
  teamName: string;
}
