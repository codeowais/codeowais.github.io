import os
import json
import webview

class JSONEditorAPI:
    def __init__(self):
        self.current_dir = os.path.dirname(os.path.abspath(__file__))
        
    def _get_file_path(self, filename, create_if_missing=False):
        """Builds the path to the database folder. Optionally creates it if missing."""
        if not filename.strip():
            filename = "content"
        filename = os.path.splitext(filename.strip())[0] + ".json"
        
        file_path = os.path.abspath(os.path.join(self.current_dir, '..', 'database', filename))
        
        if create_if_missing:
            db_dir = os.path.dirname(file_path)
            if not os.path.exists(db_dir):
                os.makedirs(db_dir)
            if not os.path.exists(file_path):
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump([], f, indent=4)
                    
        return file_path

    def _load_data(self, file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            return []

    def _save_data(self, file_path, data):
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)

    def get_entry(self, filename, entry_id):
        if not filename.strip():
            return {"success": False, "error": "JSON File Name cannot be empty."}

        create_file = bool(entry_id.strip())
        file_path = self._get_file_path(filename, create_if_missing=create_file)
        
        if not entry_id.strip():
            if os.path.exists(file_path):
                return {"success": True, "file_exists": True}
            return {"success": True, "file_exists": False}

        data = self._load_data(file_path)
        for item in data:
            if item.get('id') == entry_id:
                return {
                    "success": True, 
                    "found": True, 
                    "content": item.get('content', '')
                }
        return {"success": True, "found": False}

    def save_or_update_entry(self, filename, entry_id, content):
        if not entry_id.strip():
            return {"success": False, "error": "ID cannot be empty."}
        if not filename.strip():
            return {"success": False, "error": "JSON File Name cannot be empty."}

        file_path = self._get_file_path(filename, create_if_missing=True)
        data = self._load_data(file_path)
        found = False

        for item in data:
            if item.get('id') == entry_id:
                item['content'] = content
                found = True
                break

        if not found:
            new_entry = {
                "id": entry_id, 
                "content": content
            }
            data.append(new_entry)

        self._save_data(file_path, data)
        return {"success": True, "updated": found}

    def delete_file(self, filename):
        """Deletes the entire JSON file from the disk."""
        if not filename.strip():
            return {"success": False, "error": "JSON File Name cannot be empty."}
            
        file_path = self._get_file_path(filename, create_if_missing=False)
        
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
                return {"success": True}
            except Exception as e:
                return {"success": False, "error": str(e)}
        else:
            return {"success": False, "error": "File does not exist."}

    def delete_entry(self, filename, entry_id):
        """Removes a specific entry ID from the chosen JSON file."""
        if not filename.strip() or not entry_id.strip():
            return {"success": False, "error": "File name and Entry ID are both required."}
            
        file_path = self._get_file_path(filename, create_if_missing=False)
        if not os.path.exists(file_path):
            return {"success": False, "error": "File does not exist."}
            
        data = self._load_data(file_path)
        initial_length = len(data)
        
        data = [item for item in data if item.get('id') != entry_id]
        
        if len(data) < initial_length:
            self._save_data(file_path, data)
            return {"success": True, "found": True}
        return {"success": True, "found": False}

if __name__ == '__main__':
    api = JSONEditorAPI()
    webview.create_window(
        title='Multi-File JSON Manager', 
        url='index-cms.html', 
        js_api=api,
        width=960,
        height=780,
        resizable=True,
    )
    webview.start()