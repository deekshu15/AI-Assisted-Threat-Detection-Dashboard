from processors.base_processor import BaseProcessor
import pandas as pd


class LinuxProcessor(BaseProcessor):

    def validate(self, dataframe: pd.DataFrame) -> bool:
        return True

    def normalize(self, dataframe: pd.DataFrame) -> pd.DataFrame:
        return dataframe