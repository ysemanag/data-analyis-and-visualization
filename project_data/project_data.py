import pandas as pd
import seaborn as sb

def get_data():
	df = pd.read_csv('titanic_data.csv')
	df = df.head()
	return df
