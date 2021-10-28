import pytest 
from faker import Faker
from app.account.models import Account

fake = Faker()

@pytest.fixture
def account_creation():
    return Account(
        type_id = '1',
        identity ='1077448820',
        first_name=fake.name(),
        last_name=fake.last_name(),
        password='12345678',
        address=fake.address(),
        phone_number=fake.phone_number()
    )


@pytest.mark.django_db
def test_account_creation(account_creation):
    account_creation.save()
    assert account_creation.identity == '1077448820'
