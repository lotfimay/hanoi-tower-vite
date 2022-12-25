function getTemporaryTower(tower1, tower2) {
    if ((tower1 == 0 && tower2 == 1) || (tower1 == 1 && tower2 == 0)) return 2;
    else if ((tower1 == 0 && tower2 == 2) || (tower1 == 2 && tower2 == 0))
      return 1;
    else (tower1 == 1 && tower2 == 2) || (tower1 == 2 && tower2 == 1);
    return 0;
  }
  
export { getTemporaryTower };
  