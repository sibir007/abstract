let ask = (qes, yes, no) => {
    confirm(qes) ? yes() : no()
};
ask(
    'yau ues?',
    () => alert('вы согласились'),
    () => alert('вы отменили выполнениею')
)