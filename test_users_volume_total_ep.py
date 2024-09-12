
from flask import url_for
from flask.testing import FlaskClient
import pytest
from adminproject.db import db
from adminproject.analytics.model import UserVolume
import datetime

# from flaskr.db import get_db, init_db
""" 
эндпоинты для диаграм должны возвращать данные в формате
датасет:
{'наименование_датасета': [('наименование_фарагмента', знаыение фрагмента), ...]}
 
"""

VOLUME_TOTAL_BITGET = 358754.7811767
VOLUME_TOTAL_BITUNIX = 55285.76278
_VOLUME_TOTAL_KEY = 'users_volume_total'
_VOLUME_TOTAL_BY_BIRZA_KEY = 'users_volume_total_by_birza'
_VOLUME_TOTAL = [[_VOLUME_TOTAL_KEY, 358754.78117669997]] # фактичекое значение 358754.7811767
VOLUME_TOTAL = {_VOLUME_TOTAL_KEY: _VOLUME_TOTAL} 
# TODO: разобраться с двоичным округлением значений
_VOLUME_TOTAL_BY_BIRZA = [
            ['Bitget', 303469.0183967],
            ['Bitunix', 55285.762780000005]  # фактичекое значение 55285.76278
        ]
VOLUME_TOTAL_BY_BIRZA = {_VOLUME_TOTAL_BY_BIRZA_KEY: _VOLUME_TOTAL_BY_BIRZA
}
VOLUME_TOTAL_ANALYTICS = {
    _VOLUME_TOTAL_KEY: _VOLUME_TOTAL,
    _VOLUME_TOTAL_BY_BIRZA_KEY: _VOLUME_TOTAL_BY_BIRZA
}

# total volume 358754.7811767
# Bitget total volume 303469.0183967
# Bitunix total volume 55285.76278
user_voluve_test_data = [
    ('1','1219128327','1035.4843','Bitget','2024-08-07 15:27:52'),
    ('2','2441680259','162953.7496377','Bitget','2024-08-07 15:27:52'),
    ('3','2771103567','78408.46946','Bitget','2024-08-07 15:27:52'),
    ('4','7782295419','0.0','Bitget','2024-08-07 15:27:52'),
    ('5','9052614972','0.0','Bitget','2024-08-07 15:27:52'),
    ('6','6972778440','6002.6996','Bitget','2024-08-07 15:27:52'),
    ('7','3768489472','13127.693422','Bitget','2024-08-07 15:27:52'),
    ('8','2050294699','0.0','Bitget','2024-08-07 15:27:52'),
    ('9','298979184','6099.89839','Bitunix','2024-08-07 15:27:52'),
    ('10','4339486302','0.0','Bitget','2024-08-07 15:27:52'),
    ('11','9200940840','10355.12998','Bitget','2024-08-07 15:27:52'),
    ('12','7332865018','5000.7378','Bitget','2024-08-07 15:27:52'),
    ('13','3133378921','0.0','Bitget','2024-08-07 15:27:52'),
    ('14','1983449842','15797.433797','Bitget','2024-08-07 15:27:52'),
    ('15','5589863017','145.029','Bitget','2024-08-07 15:27:52'),
    ('16','8467482926','10642.5914','Bitget','2024-08-07 15:27:52'),
    ('17','263611191','49185.86439','Bitunix','2024-08-07 15:27:52')
]


@pytest.fixture(autouse=True, scope='module')
def init_user_volume_table(app):
    """init user volume table, total volum = """

  
    with app.app_context():
        db.drop_all(bind_key='analytics')
        db.create_all(bind_key='analytics')
        db.session.add_all(
            [UserVolume(uid=u, volume=v, birza=b, created=datetime.datetime.fromisoformat(c)) for i, u, v, b, c in user_voluve_test_data]
            )
        db.session.commit()

        

def test_users_volume_total(root_aut_context_client: FlaskClient):

    resp = root_aut_context_client.get(url_for('analytics_api.users_volume_total_ep'))
    assert resp.json == VOLUME_TOTAL
    
def test_users_volume_by_birza_total(root_aut_context_client: FlaskClient):

    resp = root_aut_context_client.get(url_for('analytics_api.users_volume_by_birza_total_ep'))
    assert resp.json == VOLUME_TOTAL_BY_BIRZA
    
    
def test_users_volume_total_analytics(root_aut_context_client: FlaskClient):

    resp = root_aut_context_client.get(url_for('analytics_api.users_volume_total_analytics_ep'))
    assert resp.json == VOLUME_TOTAL_ANALYTICS




