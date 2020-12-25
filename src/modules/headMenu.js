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
    window.addEventListener('scroll', function() {
      if (pageYOffset > document.querySelector('#clubs').offsetTop ) {
          document.getElementById('totop').style.display = 'block';
      } else {
          document.getElementById('totop').style.display = 'none';
      }
  });
}

export default headMenu;