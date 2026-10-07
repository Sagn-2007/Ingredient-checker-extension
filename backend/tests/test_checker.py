import sys
import os
import pytest

sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from checker import check_product

def test_1_vegetarian_conflict():
    res = check_product("Test", ["wheat flour", "sugar", "gelatin"], "Vegetarian", [])
    assert res["verdict"] == "conflicts"
    assert any(i["ingredient"] == "gelatin" and i["status"] == "conflicts" for i in res["flagged_ingredients"])

def test_2_vegetarian_fits():
    res = check_product("Test", ["rice", "salt", "sunflower oil"], "Vegetarian", [])
    assert res["verdict"] == "fits"

def test_3_vegan_doubtful():
    res = check_product("Test", ["sugar", "natural flavours"], "Vegan", [])
    assert res["verdict"] == "doubtful"

def test_4_jain_conflict():
    res = check_product("Test", ["potato", "onion powder"], "Jain", [])
    assert res["verdict"] == "conflicts"

def test_5_common_ingredients_fits():
    res = check_product("Test", ["corn grits", "sliced almond", "iodized salt", "dextrose"], "Vegetarian", [])
    assert res["verdict"] == "fits"

def test_6_vitamins_doubtful():
    res = check_product("Test", ["corn grits", "sliced almond", "vitamins"], "Vegetarian", [])
    assert res["verdict"] == "doubtful"

def test_7_conflict_priority():
    res = check_product("Test", ["gelatin", "natural flavours"], "Vegan", [])
    assert res["verdict"] == "conflicts"

def test_8_custom_avoid():
    res = check_product("Test", ["rice", "sugar", "peanuts"], "Vegetarian", ["peanuts"])
    assert res["verdict"] == "conflicts"
    assert any(i["ingredient"] == "peanuts" and i["status"] == "conflicts" and i["source"] == "custom" for i in res["flagged_ingredients"])

# Test 9 (Allergen UI logic) is handled in popup.js, so we don't test it here as check_product doesn't do allergen extraction.
