const headMenu = () => {
  const headMain = document.querySelector('.head-main'),
    clubsList = headMain.querySelector('.clubs-list'),
    headList = clubsList.getElementsByTagName('ul');

    clubsList.addEventListener('click', () => {
      if (headList[0].style.display === 'block') {
        headList[0].style.display = 'none';
      } else {
        headList[0].style.display = 'block';
      }
    });
}

export default headMenu;