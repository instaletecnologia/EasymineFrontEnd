
const convertDate = () => {
  // função pega a data do servidor para realizar operacoes com datas.
  const dateServer = await Database.raw(` SELECT GETDATE() as Date`)
  const date = _.get(_.first(dateServer), 'Date')
  const result =  moment(date, "pt").add(2, "hours")
  return moment(result).format('YYYY-MM-DD HH:mm:ss.SSS')
};

  export { isAntDesignProOrDev, isAntDesignPro, isUrl, app };
